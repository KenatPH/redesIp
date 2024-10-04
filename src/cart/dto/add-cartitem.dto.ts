import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddItemToCartDto {
    @ApiProperty({ description: 'ID del carrito' })
    @IsNotEmpty()
    @IsString()
    cartId: string;

    @ApiProperty({ description: 'ID del producto a agregar al carrito' })
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({ description: 'Cantidad del producto a agregar' })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Precio del producto' })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
