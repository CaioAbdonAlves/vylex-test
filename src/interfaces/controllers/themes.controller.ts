import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { ThemeService } from '../../application/services/theme.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetThemesDTO } from 'src/application/dtos/themes/get-themes.dto';

@Injectable()
@ApiTags('movies')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themeService: ThemeService) {}

  // @Interval('load-themes', 10000)
  async loadThemes(): Promise<void> {
    await this.themeService.loadThemes();
  }

  @ApiOperation({ summary: 'List themes' })
  @Get()
  // @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getThemes(@Query() getThemeDTO: GetThemesDTO) {
    return this.themeService.getThemes(getThemeDTO);
  }
}
