import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pais } from 'src/pais/entities/pais.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    description: 'El identificador único de la ciudad',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @ApiProperty({ description: 'El nombre de la ciudad', example: 'Caracas' })
  nombreciudad: string;

  @ManyToOne(() => Pais)
  @ApiProperty({
    description: 'El país asociado a la ciudad',
    type: () => Pais,
  })
  pais: Pais;
}
