import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '../pagination.dto';

export class GetThemesDTO extends PaginationDTO {
  @ApiProperty({ example: 'Action' })
  @IsOptional()
  @IsString()
  name: string;
}
