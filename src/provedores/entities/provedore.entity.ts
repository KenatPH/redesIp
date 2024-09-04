import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import { CategoriaProveedor } from 'src/provedorescategory/entities/provedorescategory.entity';
import { Product } from 'src/entity/product.entity';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único del proveedor',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({
    description: 'La razón social del proveedor',
    example: 'Proveedor S.A.',
  })
  razonsocial: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({
    description: 'El contacto principal del proveedor',
    example: 'Juan Pérez',
  })
  contacto: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'El teléfono del proveedor',
    example: '+58 212-1234567',
    nullable: true,
  })
  telefono?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'El correo electrónico del proveedor',
    example: 'contacto@proveedor.com',
    nullable: true,
  })
  correo?: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  @ApiProperty({
    description: 'Estado del proveedor (activo/inactivo)',
    example: true,
  })
  activo: boolean;

  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @ApiProperty({
    description: 'El número de documento del proveedor',
    example: 'J-12345678-9',
  })
  numerodocumento: string;

  @ManyToOne(() => Pais)
  @ApiProperty({
    description: 'El país asociado al proveedor',
    type: () => Pais,
  })
  pais: Pais;

  @ManyToOne(() => Ciudad)
  @ApiProperty({
    description: 'La ciudad asociada al proveedor',
    type: () => Ciudad,
  })
  ciudad: Ciudad;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  @ApiProperty({
    description: 'La dirección del proveedor',
    example: 'Avenida Principal, Edificio 123',
  })
  direccion: string;

  @ManyToMany(() => CategoriaProveedor)
  @JoinTable()
  categorias: CategoriaProveedor[];

  @ManyToMany(() => Product, (product) => product.proveedor)
  @JoinTable()
  product: Product[];
}
