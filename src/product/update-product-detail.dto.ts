import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDetailDto } from './create-product-detail.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsDecimal,
} from 'class-validator';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto,
) {
  @ApiPropertyOptional({
    description: 'Fecha desde la cual el detalle está disponible',
    example: '2024-08-13',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  desde?: string;

  @ApiPropertyOptional({
    description: 'Fecha hasta la cual el detalle está disponible',
    example: '2024-12-31',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  hasta?: string;

  @ApiPropertyOptional({ description: 'Cantidad mínima a vender', example: 0 })
  @IsOptional()
  @IsNumber()
  minimo_a_vender?: number;

  @ApiPropertyOptional({ description: 'Cantidad máxima a vender', example: 0 })
  @IsOptional()
  @IsNumber()
  maximo_a_vender?: number;

  @ApiPropertyOptional({
    description: 'Indica si el precio es por día',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  precio_por_dia?: boolean;

  @ApiPropertyOptional({
    description: 'Precio neto del detalle del producto',
    example: '100.00',
  })
  @IsOptional()
  @IsDecimal()
  neto?: string;

  @ApiPropertyOptional({
    description: 'Porcentaje de diferencia en el precio',
    example: '15.00',
  })
  @IsOptional()
  @IsDecimal()
  diferencia?: string;

  @ApiPropertyOptional({
    description: 'Precio de venta al público (PVP)',
    example: '115.00',
  })
  @IsOptional()
  @IsDecimal()
  pvp?: string;

  @ApiPropertyOptional({
    description: 'Indica si el detalle del producto es premium',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  premium?: boolean;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el lunes',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  lunes?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el martes',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  martes?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el miércoles',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  miercoles?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el jueves',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  jueves?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el viernes',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  viernes?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el sábado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  sabado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el domingo',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  domingo?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el lunes feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  lunes_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el martes feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  martes_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el miércoles feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  miercoles_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el jueves feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  jueves_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el viernes feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  viernes_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el sábado feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  sabado_feriado?: number;

  @ApiPropertyOptional({
    description: 'Precio del detalle del producto para el domingo feriado',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  domingo_feriado?: number;

  @ApiPropertyOptional({
    description: 'Indica si el detalle del producto está activo',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
