import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
  IsArray,
} from 'class-validator';
import { CreateProvedoresDto } from './create-provedores.dto';

export class UpdateProvedoresDto extends PartialType(CreateProvedoresDto) {
  @ApiPropertyOptional({
    description: 'La razón social del proveedor',
    example: 'Proveedor S.A.',
  })
  @IsOptional()
  @IsString()
  razonsocial?: string;

  @ApiPropertyOptional({
    description: 'El contacto principal del proveedor',
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString()
  contacto?: string;

  @ApiPropertyOptional({
    description: 'El teléfono del proveedor',
    example: '+58 212-1234567',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'El correo electrónico del proveedor',
    example: 'contacto@proveedor.com',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  correo?: string;

  @ApiPropertyOptional({
    description: 'Estado del proveedor (activo/inactivo)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({
    description: 'El número de documento del proveedor',
    example: 'J-12345678-9',
  })
  @IsOptional()
  @IsString()
  numerodocumento?: string;

  @ApiPropertyOptional({
    description: 'ID del país asociado al proveedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  paisId?: string;

  @ApiPropertyOptional({
    description: 'ID de la ciudad asociada al proveedor',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsOptional()
  @IsUUID()
  ciudadId?: string;

  @ApiPropertyOptional({
    description: 'La dirección del proveedor',
    example: 'Avenida Principal, Edificio 123',
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Lista de IDs de categorías asociadas al proveedor',
    type: [String],
    example: ['category-uuid-1', 'category-uuid-2'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categorias?: string[];
}
