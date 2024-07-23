import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UpdateUserDto } from '../dtos/users/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { BrevoEmailService } from 'src/infrastructure/email/brevo-email.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    private jwtService: JwtService,

    private emailService: BrevoEmailService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new BadRequestException('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User(
      null,
      data.name,
      data.email,
      hashedPassword,
      new Date(),
      new Date(),
    );
    return this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(userId: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const userExists = await this.userRepository.findByEmail(data.email);
      if (userExists) {
        throw new BadRequestException('User with email already exists');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = new User(
      user.id,
      data.name || user.name,
      data.email || user.email,
      data.password || user.password,
      user.createdAt,
      new Date(),
    );
    return this.userRepository.update(updatedUser);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async sendResetPasswordEmail(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const token = this.jwtService.sign({ email }, { expiresIn: '2h' });
    const resetLink = `https://vylex.frontend.com/alterar-senha?token=${token}`;

    await this.emailService.sendResetPasswordEmail(
      user.email,
      user.name,
      resetLink,
    );

    return resetLink;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const { email } = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });

      const user = await this.userRepository.findByEmail(email);

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      const updatedUser = new User(
        user.id,
        user.name,
        user.email,
        hashedPassword,
        user.createdAt,
        new Date(),
      );
      await this.userRepository.update(updatedUser);
    } catch (error) {
      throw new BadRequestException('Token inválido ou expirado!');
    }
  }
}
