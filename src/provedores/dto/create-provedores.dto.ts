import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProvedoresDto {
  @ApiProperty({
    description: 'La razón social del proveedor',
    example: 'Proveedor S.A.',
  })
  @IsString()
  razonsocial: string;

  @ApiProperty({
    description: 'El contacto principal del proveedor',
    example: 'Juan Pérez',
  })
  @IsString()
  contacto: string;

  @ApiProperty({
    description: 'El teléfono del proveedor',
    example: '+58 212-1234567',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({
    description: 'El correo electrónico del proveedor',
    example: 'contacto@proveedor.com',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  correo?: string;

  @ApiProperty({
    description: 'Estado del proveedor (activo/inactivo)',
    example: true,
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    description: 'El número de documento del proveedor',
    example: 'J-12345678-9',
  })
  @IsString()
  numerodocumento: string;

  @ApiProperty({
    description: 'ID del país asociado al proveedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  paisId: string;

  @ApiProperty({
    description: 'ID de la ciudad asociada al proveedor',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  ciudadId: string;

  @ApiProperty({
    description: 'La dirección del proveedor',
    example: 'Avenida Principal, Edificio 123',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    description: 'Lista de IDs de categorías asociadas al proveedor',
    type: [String],
    example: ['category-uuid-1', 'category-uuid-2'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  categorias: string[];
}
