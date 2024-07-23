import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ListMoviesDTO } from 'src/application/dtos/movies/list-movies.dto';
import { MoviesService } from 'src/application/services/movies.service';
import { CreateMovieViewsDTO } from 'src/application/dtos/movies/create-movie-views.dto';
import { DeleteMovieViewsDTO } from 'src/application/dtos/movies/delete-movie-views.dto';

@Injectable()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'List movies' })
  @Get()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async listMovies(@Req() req, @Query() listMoviesDTO: ListMoviesDTO) {
    const user = req.user.userId;
    return this.moviesService.listMovies(user, listMoviesDTO);
  }

  @ApiOperation({ summary: 'Save movie viewed' })
  @Post('/view')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async createMovieViews(@Body() dto: CreateMovieViewsDTO, @Req() req) {
    const user = req.user.userId;
    return this.moviesService.createMovieViews(dto, user);
  }

  @ApiOperation({ summary: 'Remove viewed movie' })
  @Delete('/view')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteMovieViews(@Body() dto: DeleteMovieViewsDTO, @Req() req) {
    const user = req.user.userId;
    return this.moviesService.deleteMovieViews(dto, user);
  }

  @ApiOperation({ summary: 'Generate report' })
  @Get('/report')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async generateReport() {
    return this.moviesService.generateReport();
  }
}
