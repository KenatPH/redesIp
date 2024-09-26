import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CategoryDTO } from './dto/CategoryDTO';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    // Obtener todas las categorías (con paginación)
    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<{ categories: Category[]; total: number }> {
        limit = Number(limit);
        const skip = (page - 1) * limit;

        const [categories, total] = await this.categoryRepository.findAndCount({
            skip,
            take: limit,
        });

        return { categories, total };
    }

    // Obtener una categoría por su ID
    async findOne(id: string): Promise<Category> {
        return await this.categoryRepository.findOne({ where: { id } });
    }


}
