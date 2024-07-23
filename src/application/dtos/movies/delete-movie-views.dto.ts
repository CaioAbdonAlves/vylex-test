import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMovieViewsDTO {
  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  movieId: number;
}
