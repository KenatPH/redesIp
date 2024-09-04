import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemProducto } from 'src/itemproducto/entities/itemproducto.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'El identificador único del ítem',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({
    description: 'El nombre del ítem',
    example: 'Nombre del ítem',
  })
  nombreitem: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Estado del ítem (activo/inactivo)',
    example: true,
  })
  activo: boolean;

  @Column({ type: 'varchar', length: 10 })
  @IsString()
  @IsIn(['text', 'number', 'date'])
  @ApiProperty({
    description: 'El tipo del ítem (text, number, date)',
    example: 'text',
  })
  tipo: string;

  @OneToMany(() => ItemProducto, (itemProducto) => itemProducto.item)
  itemProductos: ItemProducto[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
