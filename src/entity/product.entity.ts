import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { IsString, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDetail } from './product-detail.entity';
import { Productcategory } from 'src/productcategory/entities/productcategory.entity';
import { Proveedor } from 'src/provedores/entities/provedore.entity';
import { ItemProducto } from 'src/itemproducto/entities/itemproducto.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'El nombre del producto', example: 'Camiseta' })
  nombre: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Indica si el producto está activo',
    example: true,
  })
  activo: boolean;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product, {
    cascade: true,
  })
  detalles: ProductDetail[];

  @ManyToMany(() => Productcategory)
  @JoinTable()
  @ApiProperty({
    description: 'Las categorías asociadas al proveedor',
    type: () => [Productcategory],
  })
  categorias: Productcategory[];

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.product, { eager: true })
  proveedor: Proveedor;

  @OneToMany(() => ItemProducto, (itemProducto) => itemProducto.product)
  itemProductos: ItemProducto[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
