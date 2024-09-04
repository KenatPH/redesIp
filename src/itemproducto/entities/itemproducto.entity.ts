import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/item/entities/item.entity';
import { Product } from 'src/entity/product.entity';

@Entity()
export class ItemProducto {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'El identificador único de la relación item-producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ManyToOne(() => Item, (item) => item.itemProductos, { eager: true })
  @ApiProperty({
    description: 'El ítem asociado al producto',
    type: () => Item,
  })
  item: Item;

  @ManyToOne(() => Product, (product) => product.itemProductos, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'El producto asociado al ítem',
    type: () => Product,
  })
  product: Product;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    description: 'El valor asociado al ítem para el producto',
    example: 'Valor del ítem',
  })
  valor: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
