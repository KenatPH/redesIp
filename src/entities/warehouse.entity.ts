import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('Warehouse')
export class Warehouse {
    @ObjectIdColumn() // Usado para MongoDB
    id: string;

    @Column()
    externalId: string;

    @Column()
    warehouse: string;

    @Column()
    direction: string;

}
