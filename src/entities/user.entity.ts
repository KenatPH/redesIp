import { IsEmail, IsInt, IsString } from 'class-validator';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('users')
export class User {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsString()
  fullName: string;

  @Column()
  @IsString()
  birthDate: Date;


  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  direccion: string;

  @Column({ nullable: true })
  @IsString()
  image: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column('array')
  roles: ObjectId[];

  @Column({ type: 'int', default: 0 })
  @IsInt()
  attempts: number;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: true })
  activated: boolean;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
