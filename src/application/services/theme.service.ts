import { Injectable } from '@nestjs/common';
import { MongoThemeRepository } from '../../infrastructure/mongodb/theme/mongo-theme.repository';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { GenreMovieApiResponse } from '../interfaces/the-movie-db.interface';
import { Theme } from 'src/domain/schemas/theme.schema';
import { PaginationType } from 'src/application/interfaces/pagination.interface';
import { GetThemesDTO } from '../dtos/themes/get-themes.dto';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ThemeService {
  constructor(
    private readonly themeRepository: MongoThemeRepository,
    private readonly httpService: HttpService,
  ) {}

  @Interval('load-themes', 10000)
  async loadThemes(): Promise<void> {
    const { data: themes } = await this.themeRepository.find();

    if (themes && themes.length) {
      console.log('Themes loaded');
      return;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<GenreMovieApiResponse>('/genre/movie/list?language=en')
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error?.message);
            throw 'Error to fetch themes!';
          }),
        ),
    );

    await this.themeRepository.createMany(data.genres);
  }

  async getThemes(getThemeDTO: GetThemesDTO): Promise<PaginationType<Theme>> {
    const paginationThemes = await this.themeRepository.find(getThemeDTO);
    return paginationThemes;
  }
}
