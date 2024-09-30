import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('CartItems')
export class CartItem {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    cartId: string;  // Solo guardamos el ID del carrito al que pertenece el item

    @Column()
    productId: string;  // Solo guardamos el ID del producto

    @Column()
    quantity: number;  // Cantidad de este producto en el carrito

    @Column()
    price: number;  // Precio del producto en el momento de agregarlo al carrito
}
