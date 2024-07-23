import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePlanDTO {
  @ApiProperty({ example: 'Filmes de ação' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '["669d9c795f719558e10f3836"]' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  themes: string[];

  @ApiProperty({ example: '1' })
  @Type(() => Number)
  @IsNumber()
  version: number;
}
