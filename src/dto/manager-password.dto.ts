import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'perez@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Nueva contraseña del usuario',
        example: 'newpassword123',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Token de recuperación',
        example: '12345abcd',
    })
    @IsNotEmpty()
    token: string;
}
