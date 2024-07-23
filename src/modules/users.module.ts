import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../application/services/user.service';
import { PrismaUserRepository } from '../infrastructure/prisma/prisma-user.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { EmailModule } from '../infrastructure/email/email.module';
import { UsersController } from 'src/interfaces/controllers/users.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '60m' },
    }),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
