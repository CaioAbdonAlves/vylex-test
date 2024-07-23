import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDTO {
  @ApiProperty({ example: '20' })
  @IsOptional()
  pageSize: number;

  @ApiProperty({ example: '1' })
  @Type(() => Number)
  @IsNumber()
  pageNumber: number;
}
