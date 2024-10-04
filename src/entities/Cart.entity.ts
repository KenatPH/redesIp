import { CartItem } from './cart-item.entity';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('Carts')
export class Cart {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: string;  // Solo guardamos el ID del usuario

    @Column({ default: false })
    isActive: boolean;

    @Column('array')
    items: string[];  // Guardamos una lista de IDs de CartItems en lugar de objetos completos

    @Column()
    totalAmount: number;  // Precio total del carrito

    cartItems:any[];
}
