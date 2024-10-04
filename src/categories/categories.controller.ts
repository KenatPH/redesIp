import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from 'entities/category.entity';
import { CategoryService } from './categories.service';

@ApiTags('categories')  // Etiqueta para Swagger
@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías con paginación' })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de categorías por página', example: 10 })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ categories: Category[]; total: number }> {
        return await this.categoryService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    async findOne(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOne(id);
    }

}
