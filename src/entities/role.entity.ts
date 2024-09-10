import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('role')
export class Role {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
