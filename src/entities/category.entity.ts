import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('Categories')
export class Category {
    @ObjectIdColumn() // Usado para MongoDB
    id: string;

    @Column()
    category: string;

    @Column()
    codcategory: number;

}
