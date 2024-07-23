export interface EmailService {
  sendResetPasswordEmail(
    email: string,
    name: string,
    resetLink: string,
  ): Promise<void>;
}
