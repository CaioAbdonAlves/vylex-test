import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { EmailModule } from './infrastructure/email/email.module';
import { ThemesModule } from './modules/themes.module';
import { PlansModule } from './modules/plans.module';
import { SubscriptionsModule } from './modules/subscriptions.module';
import { MoviesModule } from './modules/movies.module';
import { UserModule } from './modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
    EmailModule,
    ThemesModule,
    PlansModule,
    SubscriptionsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
