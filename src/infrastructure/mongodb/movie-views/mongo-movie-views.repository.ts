import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FindInfosByTheme,
  FindTotalViewsAndLastMovie,
} from 'src/application/interfaces/report.interface';
import { MoviesViewsRepository } from 'src/domain/repositories/movie-views.repository';
import { MovieViews } from 'src/domain/schemas/movie-views.schema';

@Injectable()
export class MongoMovieViewsRepository implements MoviesViewsRepository {
  constructor(
    @InjectModel(MovieViews.name) private movieViewModel: Model<MovieViews>,
  ) {}

  async create(movie: MovieViews): Promise<MovieViews> {
    return this.movieViewModel.create(movie);
  }

  async findOne(filter: any): Promise<MovieViews | null> {
    return this.movieViewModel.findOne(filter).exec();
  }

  async deleteOne(filter: any): Promise<any> {
    return this.movieViewModel.deleteOne(filter).exec();
  }

  async findTotalViewsAndLastMovie(): Promise<FindTotalViewsAndLastMovie[]> {
    const result = await this.movieViewModel
      .aggregate([
        {
          $group: {
            _id: '$userId',
            total: {
              $sum: 1,
            },
            id: {
              $last: '$id',
            },
            title: {
              $last: '$title',
            },
          },
        },
      ])
      .exec();

    return result;
  }

  async findInfosByTheme(): Promise<FindInfosByTheme[]> {
    const result = await this.movieViewModel
      .aggregate([
        {
          $unwind: '$themes',
        },
        {
          $group: {
            _id: {
              userId: '$userId',
              themes: '$themes.id',
            },
            count: {
              $sum: 1,
            },
            themeId: {
              $first: '$themes.id',
            },
            themeName: {
              $first: '$themes.name',
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $group: {
            _id: '$_id.userId',
            count: {
              $first: '$count',
            },
            themeId: {
              $first: '$themeId',
            },
            themeName: {
              $first: '$themeName',
            },
          },
        },
      ])
      .exec();

    return result;
  }
}
