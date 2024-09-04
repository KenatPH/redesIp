import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsBoolean, IsUUID } from 'class-validator';
import { Role } from './role.entity';
import { Module } from './module.entity';

@Entity()
export class RoleModule {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ManyToOne(() => Role, (role) => role.roleModules, { onDelete: 'CASCADE' })
  role: Role;

  @ManyToOne(() => Module, { eager: true, onDelete: 'CASCADE' })
  module: Module;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  crear: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  editar: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  eliminar: boolean;
}
