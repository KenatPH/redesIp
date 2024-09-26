import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; // Asegúrate de tener la entidad User
import { Product } from './product.entity';

@Entity('favorite_products')
export class FavoriteProduct {
    @ObjectIdColumn() // Usado para MongoDB
    id: string;

    @Column()  // Guardamos el ID del usuario directamente
    userId: string;

    @Column()  // Guardamos el ID del producto directamente
    productId: string;
}
