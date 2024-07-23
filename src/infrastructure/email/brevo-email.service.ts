import { Injectable } from '@nestjs/common';
import { EmailService } from '../../application/interfaces/email-service.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BrevoEmailService implements EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, name: string, resetLink: string) {
    const template = `<body style="background-color: #eeeeee; color: #222222; font-family: Arial, Helvetica, sans-serif;">
    <div
        style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-sizing: border-box;">
        <center>
            <h1 style="font-size: 21px; font-weight: 800;">Olá, ${name}!</h1>
        </center>
        <p>Você solicitou a recuperação de sua senha. Clique no link abaixo para redefinir sua senha:</p>
        <center>
            <a href="${resetLink}"
                style="background: black; color: white; padding: 12px 16px; margin: 4px 0; display: inline-block; font-weight: 700; border-radius: 8px; text-decoration: none;">Redefinir
                Senha</a>
        </center>
        <p>Se não foi você que solicitou a recuperação de senha, por favor, ignore este email.</p>
        <p>Atenciosamente,</p>
        <p><b>Equipe Vylex</b></p>
    </div>
</body>`;

    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Recuperação de Senha',
        html: template,
      })
      .then((response) => console.log('Resposta do envio de email: ', response))
      .catch((error) => console.log('erro no envio de email: ', error));
  }
}
