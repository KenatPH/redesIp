import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional, IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({ description: 'Apellidos del cliente', example: 'Doe' })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiPropertyOptional({ description: 'Nombres del cliente', example: 'John' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({
    description: 'Identificación del cliente',
    example: 'V-12345678',
  })
  @IsOptional()
  @IsString()
  identificacion?: string;

  @ApiPropertyOptional({
    description: 'Contacto del cliente',
    example: '+58 212-1234567',
  })
  @IsOptional()
  @IsString()
  contacto?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del cliente',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsString()
  correo?: string;

  @ApiPropertyOptional({
    description: 'Dirección del cliente',
    example: '123 Main St, City, Country',
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({
    description: 'Fecha de registro del cliente',
    example: '2024-01-01',
  })
  @IsString()
  fecha: string;

  @ApiPropertyOptional({
    description: 'Categorización del cliente',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  categorizacion?: number;

  @ApiPropertyOptional({
    description: 'Tipo de Cliente /1 juridico /2 empresa /3 natural ',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  tipo_cliente?: number;

  @ApiPropertyOptional({ description: 'Estado del Cliente', example: 1 })
  @IsOptional()
  @IsInt()
  status_cliente?: number;
}
