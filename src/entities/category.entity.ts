import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('Categories')
export class Category {
    @ObjectIdColumn() // Usado para MongoDB
    _id: ObjectId;

    @Column()
    category: string;

    @Column()
    codcategory: number;

}
