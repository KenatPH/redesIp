import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Descuento {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'El identificador único de descuento.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'float' })
  @IsNumber()
  @ApiProperty({ description: 'El porcentaje de la comisión', example: 5.0 })
  porcentaje: number;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  @ApiProperty({
    description: 'titulo',
    example: 'dia de las madres',
  })
  titulo: string;
}
