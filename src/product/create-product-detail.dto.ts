import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDetailDto {
  @ApiPropertyOptional({
    description: 'Fecha desde la cual el detalle está disponible',
    example: '2024-08-13',
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  desde?: string;

  @ApiPropertyOptional({
    description: 'Fecha hasta la cual el detalle está disponible',
    example: '2024-12-31',
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  hasta?: string;

  @ApiProperty({
    description: 'Cantidad mínima a vender',
    example: 0,
  })
  @IsNumber()
  minimo_a_vender: number;

  @ApiProperty({
    description: 'Cantidad máxima a vender',
    example: 0,
  })
  @IsNumber()
  maximo_a_vender: number;

  @ApiProperty({
    description: 'Indica si el precio es por día',
    example: true,
  })
  @IsBoolean()
  precio_por_dia: boolean;

  @ApiProperty({
    description: 'Precio neto del detalle del producto',
    example: '100.00',
  })
  @IsDecimal()
  neto: string;

  @ApiProperty({
    description: 'Porcentaje de diferencia en el precio',
    example: '15.00',
  })
  @IsDecimal()
  diferencia: string;

  @ApiProperty({
    description: 'Precio de venta al público (PVP)',
    example: '115.00',
  })
  @IsDecimal()
  pvp: string;

  @ApiProperty({
    description: 'Indica si el detalle del producto es premium',
    example: true,
  })
  @IsBoolean()
  premium: boolean;

  @ApiProperty({
    description: 'Precio del detalle del producto para el lunes',
    example: 0,
  })
  @IsNumber()
  lunes: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el martes',
    example: 0,
  })
  @IsNumber()
  martes: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el miércoles',
    example: 0,
  })
  @IsNumber()
  miercoles: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el jueves',
    example: 0,
  })
  @IsNumber()
  jueves: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el viernes',
    example: 0,
  })
  @IsNumber()
  viernes: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el sábado',
    example: 0,
  })
  @IsNumber()
  sabado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el domingo',
    example: 0,
  })
  @IsNumber()
  domingo: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el lunes feriado',
    example: 0,
  })
  @IsNumber()
  lunes_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el martes feriado',
    example: 0,
  })
  @IsNumber()
  martes_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el miércoles feriado',
    example: 0,
  })
  @IsNumber()
  miercoles_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el jueves feriado',
    example: 0,
  })
  @IsNumber()
  jueves_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el viernes feriado',
    example: 0,
  })
  @IsNumber()
  viernes_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el sábado feriado',
    example: 0,
  })
  @IsNumber()
  sabado_feriado: number;

  @ApiProperty({
    description: 'Precio del detalle del producto para el domingo feriado',
    example: 0,
  })
  @IsNumber()
  domingo_feriado: number;

  @ApiProperty({
    description: 'Indica si el detalle del producto está activo',
    example: true,
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    description:
      'El identificador único del producto al que pertenece este detalle',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  productId: string;
}
