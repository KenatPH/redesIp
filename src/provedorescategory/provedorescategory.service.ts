import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaProveedor } from './entities/provedorescategory.entity';
import { UpdateProvedorescategoryDto } from './dto/update-provedorescategory.dto';
import { CreateProvedorescategoryDto } from './dto/create-provedorescategory.dto';

@Injectable()
export class ProvedorescategoryService {
  constructor(
    @InjectRepository(CategoriaProveedor)
    private readonly categoriaProveedorRepository: Repository<CategoriaProveedor>,
  ) {}

  create(
    createCategoriaProveedorDto: CreateProvedorescategoryDto,
  ): Promise<CategoriaProveedor> {
    const categoriaProveedor = this.categoriaProveedorRepository.create(
      createCategoriaProveedorDto,
    );
    return this.categoriaProveedorRepository.save(categoriaProveedor);
  }

  findAll(): Promise<CategoriaProveedor[]> {
    return this.categoriaProveedorRepository.find();
  }

  async findOne(id: string): Promise<CategoriaProveedor> {
    const categoriaProveedor = await this.categoriaProveedorRepository.findOne({
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
    const categoriaProveedor = await this.categoriaProveedorRepository.preload({
      id,
      ...updateCategoriaProveedorDto,
    });
    if (!categoriaProveedor) {
      throw new NotFoundException(
        `Categoría de Proveedor con ID ${id} no encontrada`,
      );
    }
    return this.categoriaProveedorRepository.save(categoriaProveedor);
  }

  async remove(id: string): Promise<void> {
    const categoriaProveedor = await this.findOne(id);
    await this.categoriaProveedorRepository.remove(categoriaProveedor);
  }
}
