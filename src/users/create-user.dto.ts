import {
  IsString,
  IsEmail,
  IsUUID,
  IsNotEmpty,
  MinLength,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'perez@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ApiProperty({
    description: 'El nombre de usuario',
    example: 'juanperez',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'La contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'El estado del usuario (1 = activo, 0 = inactivo)',
    example: 1,
  })
  @IsInt()
  status_usuario: number;

  @ApiProperty({
    description: 'El identificador único del rol asociado al usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  roleId: string;
}
