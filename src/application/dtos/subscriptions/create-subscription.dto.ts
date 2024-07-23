import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSubscriptionDTO {
  @ApiProperty({ example: '669d9c795f719558e10f3836' })
  @IsNotEmpty()
  @IsString()
  plan: string;

  @ApiProperty({ example: '[1, 2]' })
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  users: number[];
}
