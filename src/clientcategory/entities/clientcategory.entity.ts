import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Clientcategory {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'Nombres del cliente', example: 'John' })
  nombres: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @ApiProperty({ description: 'Monto gastado en compras', example: 150.75 })
  montogastado: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @ApiProperty({
    description: 'Valor total de productos premium comprados',
    example: 250.99,
  })
  productospremium: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @ApiProperty({
    description: 'Frecuencia de compra promedio en días',
    example: 30.0,
  })
  frecuenciadecompra: number;
}
