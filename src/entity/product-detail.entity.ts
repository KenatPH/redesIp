import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único del detalle del producto',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @Column({ type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha desde la cual el detalle está disponible',
    example: '2024-08-13',
    nullable: true,
  })
  desde?: string;

  @Column({ type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha hasta la cual el detalle está disponible',
    example: '2024-12-31',
    nullable: true,
  })
  hasta?: string;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Cantidad mínima a vender',
    example: 0,
  })
  minimo_a_vender: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Cantidad máxima a vender',
    example: 0,
  })
  maximo_a_vender: number;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Indica si el precio es por día',
    example: true,
  })
  precio_por_dia: boolean;

  @Column({ type: 'decimal' })
  @IsDecimal()
  @ApiProperty({
    description: 'Precio neto del detalle del producto',
    example: '100.00',
  })
  neto: string;

  @Column({ type: 'decimal' })
  @IsDecimal()
  @ApiProperty({
    description: 'Porcentaje de diferencia en el precio',
    example: '15.00',
  })
  diferencia: string;

  @Column({ type: 'decimal' })
  @IsDecimal()
  @ApiProperty({
    description: 'Precio de venta al público (PVP)',
    example: '115.00',
  })
  pvp: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Indica si el detalle del producto es premium',
    example: true,
  })
  premium: boolean;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el lunes',
    example: 0,
  })
  lunes: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el martes',
    example: 0,
  })
  martes: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el miércoles',
    example: 0,
  })
  miercoles: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el jueves',
    example: 0,
  })
  jueves: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el viernes',
    example: 0,
  })
  viernes: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el sábado',
    example: 0,
  })
  sabado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el domingo',
    example: 0,
  })
  domingo: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el lunes feriado',
    example: 0,
  })
  lunes_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el martes feriado',
    example: 0,
  })
  martes_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el miércoles feriado',
    example: 0,
  })
  miercoles_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el jueves feriado',
    example: 0,
  })
  jueves_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el viernes feriado',
    example: 0,
  })
  viernes_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el sábado feriado',
    example: 0,
  })
  sabado_feriado: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @ApiProperty({
    description: 'Precio del detalle del producto para el domingo feriado',
    example: 0,
  })
  domingo_feriado: number;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Indica si el detalle del producto está activo',
    example: true,
  })
  activo: boolean;

  @ManyToOne(() => Product, (product) => product.detalles)
  product: Product;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
