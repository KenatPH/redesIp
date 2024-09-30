import { IsEmail, IsInt, IsString } from 'class-validator';
import { Entity, Column, ObjectIdColumn, ObjectId, OneToMany } from 'typeorm';
import { FavoriteProduct } from './FavoriteProduct.entity';
import { Address } from './address.entity';

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

  @OneToMany(() => Address, address => address.user, { cascade: true })
  addresses: Address[];

}
