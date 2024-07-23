import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Caio Abdon' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'alvesabdon431@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newPassword123' })
  @IsOptional()
  @IsString()
  password?: string;
}
