import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({
        description: 'El correo electrónico del usuario',
        example: 'perez@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'La contraseña del usuario',
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
