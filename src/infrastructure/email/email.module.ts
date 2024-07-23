import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { BrevoEmailService } from './brevo-email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@vylex.email.com>',
        },
      }),
      inject: [],
    }),
  ],
  providers: [BrevoEmailService],
  exports: [BrevoEmailService],
})
export class EmailModule {}
