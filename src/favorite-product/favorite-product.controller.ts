import { Controller, Post, Delete, Param, Get, Query, UseGuards } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('favorite-products')
@Controller('favorite-products')
export class FavoriteProductController {
    constructor(private readonly favoriteProductService: FavoriteProductService) { }

    @ApiBearerAuth()
    @Post(':userId/:productId')
    @ApiOperation({ summary: 'Agregar producto a favoritos' })
    @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
    @ApiParam({ name: 'productId', required: true, description: 'ID del producto' })
    @UseGuards(JwtAuthGuard) 
    async addFavorite(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return await this.favoriteProductService.addFavoriteProduct(userId, productId);
    }
    
    @ApiBearerAuth()
    @Delete(':userId/:productId')
    @ApiOperation({ summary: 'Eliminar producto de favoritos' })
    @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
    @ApiParam({ name: 'productId', required: true, description: 'ID del producto' })
    @UseGuards(JwtAuthGuard) 
    async removeFavorite(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return await this.favoriteProductService.removeFavoriteProduct(userId, productId);
    }

    @Get('favorites')
    @ApiOperation({ summary: 'Obtener los productos favoritos del usuario con paginación' })
    @ApiQuery({ name: 'userId', required: true, description: 'ID del usuario' })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de productos por página', example: 10 })
    async getUserFavorites(
        @Query('userId') userId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<{ products: Product[]; total: number }> {
        return await this.favoriteProductService.getUserFavoriteProducts(userId, page, limit);
    }

}
