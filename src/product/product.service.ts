import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product.entity';
import { Stock } from '../entities/Stock.entity';
import { MoreThan } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {


    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Stock)
        private stockRepository: Repository<Stock>
    ) { }


    async findAll(
        seccion?: string | string[], // Permitir un array de categorías
        search?: string,
        warehouse?: string, // Filtro de almacén
        minPrice?: number,  // Filtro de precio mínimo
        maxPrice?: number,  // Filtro de precio máximo
        inStockOnly?: boolean, // Filtro de productos disponibles en stock
        order?: 'price' | 'popularity', // Criterio de ordenamiento
        page: number = 1,
        limit: number = 10,
    ): Promise<{ products: Product[]; total: number }> {

        limit = Number(limit);
        const skip = (page - 1) * limit;

        // Construimos el filtro con los parámetros opcionales
        const filter: any = {};

        // Filtrar por una o más categorías (secciones)
        if (seccion) {
            if (Array.isArray(seccion)) {
                filter.seccion = { $in: seccion };  // Si se pasan varias categorías
            } else {
                filter.seccion = seccion;  // Solo una categoría
            }
        }

        // Filtrar por búsqueda en nombre o descripción
        if (search) {
            filter.$or = [
                { product_name: { $regex: search, $options: 'i' } }, // Coincidencia parcial en el nombre
                { description: { $regex: search, $options: 'i' } }   // Coincidencia parcial en la descripción
            ];
        }

        // Filtrar por rango de precios
        if (minPrice || maxPrice) {
            minPrice = Number(minPrice)
            maxPrice = Number(maxPrice)
            filter.price_usd = {};
            if (minPrice) filter.price_usd.$gte = minPrice;  // Precio mínimo
            if (maxPrice) filter.price_usd.$lte = maxPrice;  // Precio máximo
        }

        // Si se proporciona un almacén o se filtra por stock disponible
        if (warehouse || inStockOnly) {
            const stockFilter: any = {};
            if (warehouse) stockFilter.warehouse = warehouse;
            if (inStockOnly) stockFilter.stock_disponible = { $gt: 0 }; // Filtrar productos con stock disponible > 0

            // Obtener los stocks que coinciden con los filtros de almacén y stock
            const stocks = await this.stockRepository.find({
                where: stockFilter,
            });

            // Obtener los IDs de los productos que cumplen con el filtro de almacén y stock
            const productIds = stocks.map(stock => stock.productId);

            // Incluir el filtro de productos que tienen stock disponible en el almacén
            filter.id = { $in: productIds };
        }
        

        // Realizar la búsqueda con el filtro creado
        const [products, total] = await this.productRepository.findAndCount({
            where: filter,
            skip,
            take: limit,
            // order:
            order: this.getOrderCriteria(order), // Agregar el criterio de ordenamiento
        });

        // Incrementar el contador de búsquedas para cada producto encontrado
        for (const product of products) {
            await this.productRepository.update(product._id, {
                search_count: (product.search_count && product.search_count != 0 )? product.search_count += 1 : 0
            });  // Guardar el nuevo valor en la base de datos
        }

        return { products, total };
    }

    // Método auxiliar para definir el criterio de ordenamiento
    getOrderCriteria(order?: 'price'| 'popularity'): any {
        if (order === 'price') {
            return { price_usd: 'ASC' }; // Ordenar por precio ascendente
        } else if (order === 'popularity') {
            return { search_count: 'DESC' }; // Ordenar por popularidad (número de búsquedas o ventas)
        } 
        return {}; // Sin ordenamiento si no se especifica
    }




    async getMostSearchedProducts(limit: number = 10): Promise<Product[]> {

        limit = Number(limit);
        const products =  await this.productRepository.find({
            order: {
                search_count: 'DESC',  // Ordenar por la cantidad de búsquedas en orden descendente
            },
            take: limit,  // Limitar la cantidad de productos devueltos
        });
        return products
    }

    async findStocksByWarehouse(
        warehouse: string,
        productName?: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ stocks: Stock[]; total: number }> {

        limit = Number(limit);
        const skip = (page - 1) * limit;

        // Filtro por almacén
        const filter: any = { warehouse };

        // Filtrar por nombre del producto si se proporciona
        if (productName) {
            filter.product_name = { $regex: productName, $options: 'i' };
        }

        // Obtener stocks filtrados por almacén y nombre de producto (si se proporciona)
        const [stocks, total] = await this.stockRepository.findAndCount({
            where: filter,
            skip,
            take: limit,
        });

        // Incrementar el contador de búsquedas para cada stock encontrado
        for (const stock of stocks) {
            stock.search_count += 1;
            await this.stockRepository.save(stock);  // Guardar el nuevo valor en la base de datos
        }

        return { stocks, total };
    }



    // Obtener un producto por su ID
    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { _id: new ObjectId(id) } })
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }



}
