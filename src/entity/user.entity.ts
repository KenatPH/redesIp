import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsUUID, IsString, IsInt, IsEmail } from 'class-validator';
import { Role } from 'src/entity/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  apellido: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  correo: string;

  @Column({ type: 'varchar', unique: true })
  @IsString()
  username: string;

  @Column({ type: 'varchar' })
  @IsString()
  password: string;

  @Column({ type: 'int', default: 1 })
  @IsInt()
  status_usuario: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
