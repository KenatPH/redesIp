import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'El nombre del usuario',
    example: 'Juan',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'El apellido del usuario',
    example: 'Pérez',
  })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiPropertyOptional({
    description: 'El estado del usuario (1 = activo, 0 = inactivo)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  status_usuario?: number;

  @ApiProperty({
    description: 'El identificador único del rol asociado al usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  roleId: string;

  @ApiPropertyOptional({
    description:
      'La contraseña del usuario (mínimo 6 caracteres), enviar solo si se va a cambiar',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;
}
