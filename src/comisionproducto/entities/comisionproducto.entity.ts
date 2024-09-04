import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/entity/role.entity';
import { Product } from 'src/entity/product.entity';

@Entity()
export class ComisionProducto {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'El identificador único de la relación comisión-producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ManyToOne(() => Role, { eager: true })
  @ApiProperty({
    description: 'El rol asociado a la comision',
    type: () => Role,
  })
  role: Role;

  @ManyToOne(() => Product, { eager: true })
  @ApiProperty({
    description: 'El producto asociado a la comision',
    type: () => Product,
  })
  product: Product;

  @Column({ type: 'float' })
  @IsNumber()
  @ApiProperty({ description: 'El porcentaje de la comisión', example: 5.0 })
  porcentaje: number;

  @Column({ type: 'varchar', length: 10 })
  @IsString()
  @IsIn(['pvp', 'neto', 'diferencia'])
  @ApiProperty({
    description: 'A qué se aplica la comisión (pvp, neto, diferencia)',
    example: 'pvp',
  })
  aplica: string;
}
