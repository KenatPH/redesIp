import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '../entities/Product.entity';

@ApiTags('products')  // Etiqueta para Swagger
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }



    
    @Get('/get/:id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    async findOne(@Param('id') id: string): Promise<Product> {
        return await this.productService.findOne(id);
    }

    @Get('most-searched')
    @ApiOperation({ summary: 'Obtener los productos más buscados' })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de productos a devolver', example: 10 })
    async getMostSearched(@Query('limit') limit: number = 10) {
        return await this.productService.getMostSearchedProducts(limit);
    }


    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos con paginación y filtrado' })
    @ApiQuery({
        name: 'category',
        required: false,
        description: 'Filtrar por una o más categorías. Puede ser una cadena o un array de categorías.',
        type: String,
        isArray: true,
        example: ['RX', 'PROMOCIONES'] // Ejemplo de uso múltiple
    })
    @ApiQuery({
        name: 'search',
        required: false,
        description: 'Buscar por coincidencia en el nombre o la descripción del producto. El valor es insensible a mayúsculas y minúsculas.',
        example: 'acetaminofen'
    })
    @ApiQuery({
        name: 'warehouse',
        required: false,
        description: 'Filtrar productos que estén disponibles en un almacén específico. Introducir el ID o nombre del almacén.',
        example: 'FAV'
    })
    @ApiQuery({
        name: 'minPrice',
        required: false,
        description: 'Filtrar productos con un precio mayor o igual al valor especificado.',
        type: Number,
        example: 50
    })
    @ApiQuery({
        name: 'maxPrice',
        required: false,
        description: 'Filtrar productos con un precio menor o igual al valor especificado.',
        type: Number,
        example: 500
    })
    @ApiQuery({
        name: 'inStockOnly',
        required: false,
        description: 'Filtrar solo productos que tengan stock disponible. Acepta valores booleanos: true (solo productos con stock disponible) o false (todos los productos).',
        type: Boolean,
        example: true
    })
    @ApiQuery({
        name: 'order',
        required: false,
        enum: ['price', 'popularity'],
        description: `
    Especifica el criterio de ordenamiento para los resultados:
    - price: Ordena los productos por precio, de menor a mayor.
    - relevance: Ordena los productos por relevancia respecto a la búsqueda realizada.
    - popularity: Ordena los productos por popularidad, basada en la cantidad de búsquedas o ventas.
    `,
        example: 'price'
    })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Número de la página a consultar para paginación. El valor por defecto es 1.',
        type: Number,
        example: 1
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Cantidad de productos por página en la paginación. El valor por defecto es 10.',
        type: Number,
        example: 10
    })
    async findAll(
        @Query('category') seccion?: string | string[],
        @Query('search') search?: string,
        @Query('warehouse') warehouse?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('inStockOnly') inStockOnly?: boolean,
        @Query('order') order?: 'price' | 'popularity',
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return await this.productService.findAll(seccion, search, warehouse, minPrice, maxPrice, inStockOnly, order, page, limit);
    }




    // @Get('most-searched-by-warehouse')
    // @ApiOperation({ summary: 'Obtener los productos más buscados por almacén' })
    // @ApiQuery({ name: 'warehouse', required: true, description: 'Nombre del almacén' })
    // @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de productos a devolver', example: 10 })
    // async getMostSearchedByWarehouse(
    //     @Query('warehouse') warehouse: string,
    //     @Query('limit') limit: number = 10,
    // ) {
    //     return await this.stockService.getMostSearchedProductsByWarehouse(warehouse, limit);
    // }


}
