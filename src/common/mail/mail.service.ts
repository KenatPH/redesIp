import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: this.configService.get<string>('MAIL_SEND'), // your email account
                pass: this.configService.get<string>('MAIL_PASSW'), // your email password
            },
        });
    }

    async sendConfirmationEmail(email: string, token: string) {
        const confirmationUrl = `${process.env.APP_URL}/auth/confirm?token=${token}`;

        await this.transporter.sendMail({
            from: '"Your App" <no-reply@yourapp.com>', // sender address
            to: email, // list of receivers
            subject: 'Please confirm your email', // Subject line
            text: `Click the following link to confirm your email: ${confirmationUrl}`, // plain text body
            html: `<b>Click the following link to confirm your email:</b> <a href="${confirmationUrl}">Confirm Email</a>`, // html body
        });
    }


    async sendforgotpasswordEmail(email: string, token: string) {
        const forgotUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

        await this.transporter.sendMail({
            from: '"Your App" <no-reply@yourapp.com>', // sender address
            to: email, // list of receivers
            subject: 'Restablecer tu contraseña', // Subject line
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${forgotUrl}`, // plain text body
            html: `<b>Para restablecer tu contraseña, haz clic en el siguiente enlace:</b> <a href="${forgotUrl}">Restablecer</a>`, // html body
        });
    }
}
