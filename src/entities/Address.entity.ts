import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Asegúrate de tener la entidad User

@Entity('addresses')
export class Address {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    type: string; // Ej: "shipping"

    @Column()
    street: string;

    @Column()
    building: string;

    @Column()
    country: string;

    @Column({ default: false })
    isDefault: boolean;

    // Relación con el usuario
    @ManyToOne(() => User, user => user.addresses)
    user: User;
}
