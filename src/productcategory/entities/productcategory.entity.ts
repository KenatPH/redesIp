import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Productcategory {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único de la categoría de producto',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({
    description: 'El nombre de la categoría',
    example: 'Tecnología',
  })
  nombrecategoria: string;
}
