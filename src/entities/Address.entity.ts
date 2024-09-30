import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne } from 'typeorm';

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

    @Column()
    userId: string; 
}


