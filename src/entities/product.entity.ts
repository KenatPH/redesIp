import { Entity, Column, ObjectIdColumn, OneToMany, ObjectId } from 'typeorm';
import { Stock } from './stock.entity';
import { FavoriteProduct } from './FavoriteProduct.entity';

@Entity('products')
export class Product {
    @ObjectIdColumn() // Usado para MongoDB
    _id: ObjectId;

    @Column()
    externalId: string;

    @Column()
    product_name: string;

    @Column()
    price_usd: number;

    @Column()
    price_ved: number;

    @Column()
    seccion: string;

    @Column()
    stock: number;

    @Column()
    sku: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 0 }) // Nueva columna para contar las búsquedas
    search_count: number;

    // Relación con Stock, un producto puede tener múltiples stocks
    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[];  // Relación de uno a muchos con Stock

}
