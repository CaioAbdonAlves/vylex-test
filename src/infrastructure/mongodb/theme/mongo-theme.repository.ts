import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ThemeFilters,
  ThemeRepository,
} from '../../../domain/repositories/theme.repository';
import { Theme } from '../../../domain/schemas/theme.schema';
import {
  DEFAULT_PAGE_SIZE,
  PaginationType,
} from 'src/application/interfaces/pagination.interface';

@Injectable()
export class MongoThemeRepository implements ThemeRepository {
  constructor(@InjectModel(Theme.name) private themeModel: Model<Theme>) {}

  async createMany(themes: Theme[]): Promise<Theme[]> {
    return this.themeModel.create(themes);
  }

  async find(filters?: ThemeFilters): Promise<PaginationType<Theme>> {
    const { name, pageNumber, pageSize = DEFAULT_PAGE_SIZE } = filters || {};

    const query: FilterQuery<Theme> = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    const [totalThemes, themes] = await Promise.all([
      this.themeModel.countDocuments(query),
      this.themeModel
        .find(query)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalThemes / pageSize);

    return {
      data: themes,
      pagination: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalPages: totalPages,
        lastPage: pageNumber == totalPages,
        firstPage: pageNumber == 1,
      },
    };
  }
}
