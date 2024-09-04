import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  titulo: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  icono: string;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  path: string;

  @Column({ type: 'int' })
  order: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
