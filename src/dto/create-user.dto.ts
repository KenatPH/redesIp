import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional, IsArray, IsNumber, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'El nombre de usuario',
        example: 'juan perez',
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        description: 'fecha de nacimiento del usuario',
        example: '10/10/2020',
    })
    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @ApiProperty({
        description: 'El correo electrónico del usuario',
        example: 'perez@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'El numero telefonico del usuario',
        example: 'perez@example.com',
    })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    direccion: string;

    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({
        description: 'La contraseña del usuario (mínimo 8 caracteres)',
        example: 'password123',
    })
    @IsNotEmpty()
    @Length(8, 20)
    password: string;

    @ApiProperty({
        description: 'El identificador único del rol asociado al usuario',
        example: '123e4567e89b12d3a456426614174000',
    })
    @IsOptional()
    roleId: string;

    // @IsArray()
    // roles: ObjectId[];

    // @IsNumber()
    // attempts: number;

    // @IsBoolean()
    // @IsOptional()
    // confirmed?: boolean;

    // @IsBoolean()
    // @IsOptional()
    // activated?: boolean;

    // @IsOptional()
    // @IsString()
    // resetPasswordToken?: string;

    // @IsOptional()
    // @IsDate()
    // @Type(() => Date)
    // resetPasswordExpires?: Date;
}
