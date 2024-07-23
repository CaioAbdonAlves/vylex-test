import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../../application/dtos/users/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/users/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ResetPasswordDTO } from 'src/application/dtos/users/reset-password.dto';
import { LoginUserDTO } from 'src/application/dtos/users/login-user.dto';
import { ForgotPasswordDTO } from 'src/application/dtos/users/forgot-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update user information' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBadRequestResponse({ description: 'User with email already exists' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.userService.update(userId, updateUserDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTYyNjU3MjM2MiwiZXhwIjoxNjI2NTc0OTYyfQ.NyvZI-Hst7TJuhHNTddzAYHcODlzW4NRh5B9zFq9Aic',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;
    return this.userService.login(email, password);
  }

  @ApiOperation({ summary: 'Initiate forgot password process' })
  @ApiResponse({ status: 200, description: 'Reset password email sent' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.userService.sendResetPasswordEmail(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    await this.userService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }
}
