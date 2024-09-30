import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/add-cartitem.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('create/:userId')
    @ApiOperation({ summary: 'Crear un carrito de compras para un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Carrito creado exitosamente.',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuario no encontrado.',
    })
    async createCart(@Param('userId') userId: string) {
        return this.cartService.createCart(userId);
    }

    @Post('add-item')
    @ApiOperation({ summary: 'Agregar un producto al carrito' })
    @ApiResponse({
        status: 200,
        description: 'Producto agregado exitosamente al carrito.',
    })
    @ApiResponse({
        status: 404,
        description: 'Carrito o producto no encontrado.',
    })
    async addItemToCart(@Body() addItemToCartDto: AddItemToCartDto) {
        return this.cartService.addItemToCart(addItemToCartDto);
    }

    @Get('getbyuser/:userId')
    @ApiOperation({ summary: 'Obtener el carrito de compras de un usuario por su ID' })
    @ApiResponse({
        status: 200,
        description: 'Carrito encontrado exitosamente.',
    })
    @ApiResponse({
        status: 404,
        description: 'Carrito no encontrado para el usuario especificado.',
    })
    async getCartByUserId(@Param('userId') userId: string) {
        return this.cartService.getCartByUserId(userId);
    }

    @Delete(':cartId/remove-item/:itemId')
    @ApiOperation({ summary: 'Eliminar un producto del carrito' })
    @ApiResponse({
        status: 200,
        description: 'Producto eliminado exitosamente del carrito.',
    })
    @ApiResponse({
        status: 404,
        description: 'Carrito o producto no encontrado.',
    })
    async removeItemFromCart(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
        return this.cartService.removeItemFromCart(cartId, itemId);
    }
}
