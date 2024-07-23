import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ForgotPasswordDTO extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'alvesabdon431@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
