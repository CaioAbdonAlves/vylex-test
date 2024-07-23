import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeService } from 'src/application/services/theme.service';
import { Theme, ThemeSchema } from 'src/domain/schemas/theme.schema';
import { MongoThemeRepository } from 'src/infrastructure/mongodb/theme/mongo-theme.repository';
import { ThemesController } from 'src/interfaces/controllers/themes.controller';

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
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
  ],
  controllers: [ThemesController],
  providers: [MongoThemeRepository, ThemeService],
  exports: [MongoThemeRepository],
})
export class ThemesModule {}
