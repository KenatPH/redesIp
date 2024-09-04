import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Clientcategory } from 'src/clientcategory/entities/clientcategory.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'Apellidos del cliente', example: 'Doe' })
  apellidos: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'Nombres del cliente', example: 'John' })
  nombres: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @ApiProperty({
    description: 'Identificación del cliente',
    example: 'V-12345678',
  })
  identificacion: string;

  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @ApiProperty({
    description: 'Contacto del cliente',
    example: '+58 212-1234567',
  })
  contacto: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'john.doe@example.com',
  })
  correo: string;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  @ApiProperty({
    description: 'Dirección del cliente',
    example: '123 Main St, City, Country',
  })
  direccion: string;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  fecha: Date;

  @ManyToOne(() => Clientcategory, { nullable: true })
  @IsOptional()
  @ApiProperty({
    description: 'Categorización del cliente',
    type: () => Clientcategory,
    nullable: true,
  })
  clientcategory?: Clientcategory;

  @Column({ type: 'int', default: 3 }) // 1 juridico / 2 empresa / 3 natural.
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Tipo de Cliente',
    example: 3,
    nullable: true,
  })
  tipo_cliente?: number;

  @Column({ type: 'int', default: 1 }) // 1 activo / 0 inactivo / eliminado.
  @IsInt()
  @ApiProperty({ description: 'Estado del Cliente', example: 1 })
  status_cliente: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
