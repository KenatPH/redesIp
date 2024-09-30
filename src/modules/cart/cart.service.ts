import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/Cart.entity';
import { Repository } from 'typeorm';
import { AddItemToCartDto } from './dto/add-cartitem.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    ) { }

    async createCart(userId: string): Promise<Cart> {
        // Verificar que el userId no esté vacío
        if (!userId) {
            throw new BadRequestException('El ID del usuario es obligatorio para crear un carrito.');
        }

        const newCart = this.cartRepository.create({ userId, isActive: true, totalAmount: 0, items: [] });
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
        }

        await this.cartItemRepository.save(cartItem);

        // Actualizar el total del carrito
        cart.totalAmount += quantity * price;
        await this.cartRepository.save(cart);

        return cart;
    }

    async getCartByUserId(userId: string): Promise<Cart> {
        // Buscar el carrito activo del usuario
        const cart = await this.cartRepository.findOne({ where: { userId, isActive: true } });
        if (!cart) {
            throw new NotFoundException(`No se encontró el carrito para el usuario con ID ${userId}.`);
        }
        return cart;
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
        cart.items = cart.items.filter(item => item !== itemId);

        // Eliminar el CartItem
        await this.cartItemRepository.delete(itemId);

        // Actualizar el total del carrito
        cart.totalAmount -= cartItem.price * cartItem.quantity; // Asumiendo que queremos restar el total del item eliminado
        await this.cartRepository.save(cart);

        return cart;
    }
}
