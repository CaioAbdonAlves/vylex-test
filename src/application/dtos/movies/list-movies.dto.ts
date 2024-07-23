import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '../pagination.dto';
import { Type } from 'class-transformer';

export class ListMoviesDTO extends PaginationDTO {
  @ApiProperty({ example: '[1, 2]' })
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsOptional()
  themes: number[];
}
