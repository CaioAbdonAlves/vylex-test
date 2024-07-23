import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PaginationType } from 'src/application/interfaces/pagination.interface';
import { ListMoviesDTO } from '../dtos/movies/list-movies.dto';
import { MongoSubscriptionRepository } from 'src/infrastructure/mongodb/subscription/mongo-subscription.repository';
import { Subscription } from 'src/domain/schemas/subscription.schema';
import {
  DiscoverMovieApiResponse,
  Movie,
  MovieDetails,
} from '../interfaces/the-movie-db.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateMovieViewsDTO } from '../dtos/movies/create-movie-views.dto';
import { MongoMovieViewsRepository } from 'src/infrastructure/mongodb/movie-views/mongo-movie-views.repository';
import { MongoThemeRepository } from 'src/infrastructure/mongodb/theme/mongo-theme.repository';
import { Report } from '../interfaces/report.interface';
import { DeleteMovieViewsDTO } from '../dtos/movies/delete-movie-views.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly subscriptionRepository: MongoSubscriptionRepository,
    private readonly themeRepository: MongoThemeRepository,
    private readonly movieViewsRepository: MongoMovieViewsRepository,
    private readonly httpService: HttpService,
  ) {}

  async listMovies(
    userId: number,
    listMoviesDTO: ListMoviesDTO,
  ): Promise<PaginationType<Movie>> {
    const { pageNumber, themes } = listMoviesDTO;
    const subscriptions = await this.subscriptionRepository.findAll({
      userId,
    });

    const themeList = await this.getAvailableThemes(themes, subscriptions);

    const { data: response } = await firstValueFrom(
      this.httpService
        .get<DiscoverMovieApiResponse>('/discover/movie', {
          params: {
            page: pageNumber,
            with_genres: themeList.join(' | '),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error?.response?.data);
            throw 'Error to fetch movies!';
          }),
        ),
    );

    return {
      data: response.results,
      pagination: {
        firstPage: pageNumber === 1,
        lastPage: pageNumber === response.total_pages,
        pageNumber,
        pageSize: response.results.length,
        totalPages: response.total_pages,
      },
    };
  }

  private async getAvailableThemes(
    themes: number[],
    subscriptions: Subscription[],
  ): Promise<number[]> {
    const themesSubscription =
      this.extractThemesFromSubscriptions(subscriptions);

    if (!themes?.length) {
      return themesSubscription;
    }

    const themesSubscriptionSet = new Set(themesSubscription);
    const themeList = themes?.filter((theme) =>
      themesSubscriptionSet.has(theme),
    );

    if (!themeList?.length) {
      return themesSubscription;
    }

    return themeList;
  }

  private extractThemesFromSubscriptions(subscriptions: Subscription[]) {
    return subscriptions
      .map((subscription) => subscription.plan.themes.map((theme) => theme.id))
      .flat();
  }

  async createMovieViews(dto: CreateMovieViewsDTO, userId: number) {
    const movie = await this.getMovieById(dto.movieId);

    const subscriptions = await this.subscriptionRepository.findAll({
      userId,
    });

    const userThemes = await this.extractThemesFromSubscriptions(subscriptions);

    const movieThemeIsValid = movie.genres.some((movieTheme) =>
      userThemes.some((themeId) => themeId === movieTheme.id),
    );

    if (!movieThemeIsValid) {
      throw new BadRequestException('User cannot watch movies of this theme');
    }

    const movieViewed = await this.movieViewsRepository.create({
      userId,
      id: movie.id,
      title: movie.title,
      themes: movie.genres,
    });

    return movieViewed;
  }

  async deleteMovieViews(dto: DeleteMovieViewsDTO, userId: number) {
    const movieView = await this.movieViewsRepository.findOne({
      userId,
      id: dto.movieId,
    });

    if (!movieView) {
      throw new BadRequestException('Movie not found in viewed list');
    }

    await this.movieViewsRepository.deleteOne({
      userId,
      id: dto.movieId,
    });

    return { message: 'Movie removed from viewed list' };
  }

  private async getMovieById(id: number): Promise<MovieDetails> {
    const { data } = await firstValueFrom(
      this.httpService.get<MovieDetails>(`/movie/${id}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error?.response?.data);
          throw 'Error to fetch movie details';
        }),
      ),
    );

    return data;
  }

  async generateReport() {
    const [findTotalViewsAndLastMovies, themesInfo] = await Promise.all([
      this.movieViewsRepository.findTotalViewsAndLastMovie(),
      this.movieViewsRepository.findInfosByTheme(),
    ]);

    const report = [] as Report[];

    for (const findTotalViewsAndLastMovie of findTotalViewsAndLastMovies) {
      const themeInfo = themesInfo.find(
        (theme) => theme._id === findTotalViewsAndLastMovie._id,
      )!;

      report.push({
        userId: findTotalViewsAndLastMovie._id,
        lastFilmeWatched: {
          movieId: findTotalViewsAndLastMovie.id,
          movieName: findTotalViewsAndLastMovie.title,
        },
        totalFilmsWatched: findTotalViewsAndLastMovie.total,
        mostWatchedTheme: {
          themeId: themeInfo.themeId,
          themeName: themeInfo.themeName,
          totalFilmsWatched: themeInfo.count,
        },
      });
    }

    return report;
  }
}
