import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('Warehouse')
export class Warehouse {
    @ObjectIdColumn() // Usado para MongoDB
    _id: ObjectId;

    @Column()
    externalId: string;

    @Column()
    warehouse: string;

    @Column()
    direction: string;

}
