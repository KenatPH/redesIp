import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity'; // Asumo que tienes una entidad `User`
import { FavoriteProduct } from 'src/entities/FavoriteProduct.entity';
 import { ObjectId } from 'mongodb';

@Injectable()
export class FavoriteProductService {
    constructor(
        @InjectRepository(FavoriteProduct)
        private readonly favoriteProductRepository: Repository<FavoriteProduct>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Agregar producto favorito
    async addFavoriteProduct(userId: string, productId: string): Promise<FavoriteProduct> {
        const user = await this.userRepository.findOne({ where: { _id: new ObjectId(userId) } } );
        const product = await this.productRepository.findOne({ where: { _id: new ObjectId(productId) } })

        if (!user || !product) {
            throw new NotFoundException('Usuario o Producto no encontrado');
        }

        // Verificar si ya está en favoritos
        const existingFavorite = await this.favoriteProductRepository.findOne({
            where: { userId: userId, productId: productId },
        });

        if (existingFavorite) {
            // throw new Error('El producto ya está en favoritos');
            throw new NotFoundException('El producto ya está en favoritos');
        }

        const favorite = this.favoriteProductRepository.create({
            userId,
            productId,
        });

        return await this.favoriteProductRepository.save(favorite);
    }

    // Eliminar producto favorito
    async removeFavoriteProduct(userId: string, productId: string): Promise<void> {
        const favorite = await this.favoriteProductRepository.findOne({
            where: { userId: userId, productId: productId },
        });

        if (!favorite) {
            throw new NotFoundException('El producto no está en favoritos');
        }

        await this.favoriteProductRepository.remove(favorite);
    }

    async getUserFavoriteProducts(userId: string, page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number }> {
        limit = Number(limit);
        const skip = (page - 1) * limit;

        // 1. Primero obtenemos todos los favoritos del usuario
        const favoriteProducts = await this.favoriteProductRepository.find({
            where: { userId: userId },
            skip,
            take: limit,
        });

        // console.log(favoriteProducts);
        

        // Si no hay favoritos, devolvemos un array vacío
        if (favoriteProducts.length == 0) {
            return { products: [], total: 0 };
        }

        // 2. Extraemos los IDs de los productos favoritos
        const productIds = favoriteProducts.map(favorite =>  new ObjectId(favorite.productId) );

        console.log(userId);
        

        // 3. Contar el total de productos favoritos (sin paginación)
        const [fp, total] = await this.favoriteProductRepository.findAndCount({
            where: { userId: userId },
        });

        console.log(total);
        

        // 4. Ahora buscamos los productos por sus IDs
        const filter: any = {};
        filter._id = { $in: productIds };
        // console.log(filter);
        
        const products = await this.productRepository.find({ where: filter});

        return { products, total };
    }

}
