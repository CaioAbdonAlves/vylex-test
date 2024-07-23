import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMovieViewsDTO {
  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  movieId: number;
}
