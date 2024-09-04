import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pais {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único del país',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'El nombre del país', example: 'Venezuela' })
  nombrepais: string;
}
