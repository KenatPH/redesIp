import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/Cart.entity';
import { Repository } from 'typeorm';
import { AddItemToCartDto } from './dto/add-cartitem.dto';
import { ObjectId } from 'mongodb';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    async createCart(userId: string): Promise<Cart> {
        // Verificar que el userId no esté vacío
        if (!userId) {
            throw new BadRequestException('El ID del usuario es obligatorio para crear un carrito.');
        }

        // Verificar si ya existe un carrito activo para este usuario
        const existingCart = await this.cartRepository.findOne({ where: { userId, isActive: true } });
        if (existingCart) {
            throw new ConflictException(`El usuario con ID ${userId} ya tiene un carrito activo.`);
        }

        // Crear un nuevo carrito
        const newCart = this.cartRepository.create({ userId, isActive: true, totalAmount: 0, items: [] });
        
        // Guardar y devolver el nuevo carrito
        return this.cartRepository.save(newCart);
    }


    async addItemToCart(addItemToCartDto: AddItemToCartDto): Promise<Cart> {
        const { cartId, productId, quantity, price } = addItemToCartDto;

        // Validar entradas
        if (!cartId || !productId || quantity <= 0 || price < 0) {
            throw new BadRequestException('CartId, ProductId, Quantity y Price son requeridos y deben ser válidos.');
        }

        // Buscar el carrito
        const cart = await this.cartRepository.findOne({ where: { _id: new ObjectId(cartId) } });
        if (!cart) {
            throw new NotFoundException(`Carrito con ID ${cartId} no encontrado`);
        }

        // Verificar si el producto ya está en el carrito
        let cartItem = await this.cartItemRepository.findOne({
            where: { cartId: cartId, productId: productId },
        });

        let isNewCartItem = false;

        if (cartItem) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cartItem.quantity += quantity;
            cartItem.price = price; // Actualizar el precio
        } else {
            // Si no, crear un nuevo CartItem
            cartItem = this.cartItemRepository.create({
                cartId,
                productId,
                quantity,
                price,
            });
            isNewCartItem = true;
        }

        // Guardar el cartItem (crea o actualiza)
        await this.cartItemRepository.save(cartItem);

        // Si es un nuevo CartItem, agregar su ID al array items del carrito
        if (isNewCartItem) {
            cart.items.push(cartItem._id.toString());  // Convertimos el ObjectId a string
        }

        // Actualizar el total del carrito
        cart.totalAmount += quantity * price;

        // Guardar el carrito con el nuevo total y los items actualizados
        await this.cartRepository.save(cart);


        const items = await this.getCartItemsWithProducts(cart._id.toString())


        return {...cart, cartItems:items};
    }


    async getCartByUserId(userId: string): Promise<Cart> {
        // Buscar el carrito activo del usuario
        const cart = await this.cartRepository.findOne({ where: { userId, isActive: true } });
        if (!cart) {
            throw new NotFoundException(`No se encontró el carrito para el usuario con ID ${userId}.`);
        }

        const items = await this.getCartItemsWithProducts(cart._id.toString())

        return {...cart, cartItems:items};
    }

    async removeItemFromCart(cartId: string, itemId: string): Promise<Cart> {
        // Buscar el carrito
        const cart = await this.cartRepository.findOne({ where: { _id: new ObjectId(cartId) } });
        if (!cart) {
            throw new NotFoundException(`Carrito con ID ${cartId} no encontrado.`);
        }

        // Buscar el CartItem
        const cartItem = await this.cartItemRepository.findOne({ where: { _id: new ObjectId(itemId) } });
        if (!cartItem) {
            throw new NotFoundException(`CartItem con ID ${itemId} no encontrado en el carrito.`);
        }

        // Filtrar el CartItem del carrito
        cart.items = cart.items.filter(item => item !== itemId);  // Eliminar el item de la lista de items

        // Eliminar el CartItem de la base de datos
        await this.cartItemRepository.delete(new ObjectId(itemId));

        // Actualizar el total del carrito (restando el total del CartItem eliminado)
        cart.totalAmount -= cartItem.price * cartItem.quantity;  // Restar el monto total del item eliminado

        // Guardar los cambios en el carrito
        await this.cartRepository.save(cart);

        return cart;
    }


      // Método para desactivar un carrito colocando isActive en false
        async deactivateCart(cartId: string): Promise<Cart> {
            // Buscar el carrito por su ID
            const cart = await this.cartRepository.findOne({ where: { _id: new ObjectId(cartId) } });

            // Si no se encuentra el carrito, lanzar una excepción
            if (!cart) {
            throw new NotFoundException(`El carrito con el ID ${cartId} no existe.`);
            }

            // Actualizar la propiedad isActive a false
            cart.isActive = false;

            // Guardar los cambios en la base de datos
            await this.cartRepository.save(cart);

            return cart;
        }

        async getCartItemsWithProducts(cartId: string): Promise<any[]> {
            // Buscar todos los CartItems para el carrito específico
            const cartItems = await this.cartItemRepository.find({ where: { cartId: cartId } });
            if (!cartItems || cartItems.length === 0) {
               return []
            }

            // Obtener todos los productIds únicos de los CartItems
            const productIds = cartItems.map(item => new ObjectId(item.productId));


            const filter:any = { $in: productIds }

            // Buscar todos los productos asociados en una sola consulta
            const products = await this.productRepository.find({
                where: { _id: filter }
            });

            // Crear un mapa de productos para acceso rápido
            const productMap = products.reduce((acc, product) => {
                acc[product._id.toString()] = product;
                return acc;
            }, {});

            // Combinar los CartItems con sus productos correspondientes
            const cartItemsWithProducts = cartItems.map(cartItem => ({
                ...cartItem,
                product: productMap[cartItem.productId] || null  // Agregar el producto al CartItem
            }));

            return cartItemsWithProducts;
        }
}
