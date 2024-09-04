import { IsInt, IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Apellidos del cliente', example: 'Doe' })
  @IsString()
  apellidos: string;

  @ApiProperty({ description: 'Nombres del cliente', example: 'John' })
  @IsString()
  nombres: string;

  @ApiProperty({
    description: 'Identificación del cliente',
    example: 'V-12345678',
  })
  @IsString()
  identificacion: string;

  @ApiProperty({
    description: 'Contacto del cliente',
    example: '+58 212-1234567',
  })
  @IsString()
  contacto: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'john.doe@example.com',
  })
  @IsString()
  correo: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: '123 Main St, City, Country',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    description: 'Fecha de registro del cliente',
    example: '2024-01-01',
  })
  @IsString()
  fecha: string;

  @ApiProperty({
    description: 'Categorización del cliente',
    example: '123e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  clientcategory?: string;

  @ApiProperty({
    description: 'Tipo de Cliente /1 juridico /2 empresa /3 natural ',
    example: 3,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  tipo_cliente?: number;
}
