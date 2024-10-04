import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product.entity';

@Entity('Stocks')
export class Stock {
    @ObjectIdColumn() // Usado para MongoDB
    id: string;

    @Column()
    product_externalId: string;

    @Column()
    stock_disponible: number;

    @Column()
    stock_minimo: number;

    @Column()
    warehouse: string;

    @Column({ default: 0 })  // Nueva columna para contar las búsquedas por almacén
    search_count: number;

    // Aquí solo guardamos el `id` del producto sin cargar toda la entidad Product
    @Column()
    productId: string;  // Campo donde guardaremos el `id` del producto

    // Relación con Product si en algún momento quieres acceder al objeto completo
    @ManyToOne(() => Product, (product) => product.stocks, { cascade: true })
    @JoinColumn({ name: 'productId' })  // Indica que el campo `productId` es la FK
    product: Product;

}
