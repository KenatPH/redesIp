import {
  IsString,
  IsBoolean,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaqueteDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre del paquete',
    example: 'Paquete de Verano',
  })
  nombrePaquete: string;

  @IsBoolean()
  @ApiProperty({ description: 'Estado del paquete', example: true })
  estado: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    description: 'Lista de IDs de productos incluidos en el paquete',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  productosIds: string[];
}
