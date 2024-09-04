import { Injectable, NotFoundException } from '@nestjs/common';
import { Productcategory } from './entities/productcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProvedorescategoryDto } from 'src/provedorescategory/dto/create-provedorescategory.dto';
import { UpdateProvedorescategoryDto } from 'src/provedorescategory/dto/update-provedorescategory.dto';
import { CategoriaProveedor } from 'src/provedorescategory/entities/provedorescategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductcategoryService {
  constructor(
    @InjectRepository(Productcategory)
    private readonly categoriaProductoRepository: Repository<Productcategory>,
  ) {}

  create(
    createCategoriaProveedorDto: CreateProvedorescategoryDto,
  ): Promise<CategoriaProveedor> {
    const categoriaProveedor = this.categoriaProductoRepository.create(
      createCategoriaProveedorDto,
    );
    return this.categoriaProductoRepository.save(categoriaProveedor);
  }

  findAll(): Promise<CategoriaProveedor[]> {
    return this.categoriaProductoRepository.find();
  }

  async findOne(id: string): Promise<CategoriaProveedor> {
    const categoriaProveedor = await this.categoriaProductoRepository.findOne({
      where: { id },
    });
    if (!categoriaProveedor) {
      throw new NotFoundException(
        `Categoría de Proveedor con ID ${id} no encontrada`,
      );
    }
    return categoriaProveedor;
  }

  async update(
    id: string,
    updateCategoriaProveedorDto: UpdateProvedorescategoryDto,
  ): Promise<CategoriaProveedor> {
    const categoriaProveedor = await this.categoriaProductoRepository.preload({
      id,
      ...updateCategoriaProveedorDto,
    });
    if (!categoriaProveedor) {
      throw new NotFoundException(
        `Categoría de Proveedor con ID ${id} no encontrada`,
      );
    }
    return this.categoriaProductoRepository.save(categoriaProveedor);
  }

  async remove(id: string): Promise<void> {
    const categoriaProveedor = await this.findOne(id);
    await this.categoriaProductoRepository.remove(categoriaProveedor);
  }
}
