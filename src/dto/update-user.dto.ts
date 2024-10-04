import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) { 
    @ApiPropertyOptional({ description: 'Nombre del usuario' })
    name?: string;

    @ApiPropertyOptional({ description: 'Correo electrónico del usuario' })
    email?: string;

    @ApiPropertyOptional({ description: 'Contraseña del usuario' })
    password?: string;

    @ApiPropertyOptional({ description: 'Edad del usuario', required: false })
    age?: number;
}
