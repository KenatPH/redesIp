import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @ApiPropertyOptional({
    description: 'Título del módulo',
    example: 'Gestión de Usuarios',
  })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({
    description: 'Ícono del módulo',
    example: 'user-icon',
  })
  @IsOptional()
  @IsString()
  icono?: string;

  @ApiPropertyOptional({ description: 'Ruta del módulo', example: '/users' })
  @IsOptional()
  @IsString()
  path?: string;
}
