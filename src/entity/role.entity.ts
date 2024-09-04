import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { User } from './user.entity';
import { RoleModule } from './role-module.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', unique: false })
  @IsString()
  nombrerol: string;

  @OneToMany(() => RoleModule, (roleModule) => roleModule.role, {
    cascade: true,
  })
  roleModules: RoleModule[];

  @ManyToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
