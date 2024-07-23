import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/application/services/movies.service';
import {
  MovieViews,
  MovieViewsSchema,
} from 'src/domain/schemas/movie-views.schema';
import { SubscriptionSchema } from 'src/domain/schemas/subscription.schema';
import { Theme, ThemeSchema } from 'src/domain/schemas/theme.schema';
import { MongoMovieViewsRepository } from 'src/infrastructure/mongodb/movie-views/mongo-movie-views.repository';
import { MongoSubscriptionRepository } from 'src/infrastructure/mongodb/subscription/mongo-subscription.repository';
import { MongoThemeRepository } from 'src/infrastructure/mongodb/theme/mongo-theme.repository';
import { MoviesController } from 'src/interfaces/controllers/movies.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('THE_MOVIE_DB_API_URL'),
        params: {
          api_key: configService.get('THE_MOVIE_DB_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    MongooseModule.forFeature([
      { name: MovieViews.name, schema: MovieViewsSchema },
    ]),
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    MongoSubscriptionRepository,
    MongoMovieViewsRepository,
    MongoThemeRepository,
  ],
})
export class MoviesModule {}
