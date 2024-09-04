import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { Descuento } from './entities/descuento.entity';

@Injectable()
export class DescuentosService {
  constructor(
    @InjectRepository(Descuento)
    private readonly descuentosRepository: Repository<Descuento>,
  ) {}

  create(createDescuentoDto: CreateDescuentoDto): Promise<Descuento> {
    const descuento = this.descuentosRepository.create(createDescuentoDto);
    return this.descuentosRepository.save(descuento);
  }

  findAll(): Promise<Descuento[]> {
    return this.descuentosRepository.find();
  }

  async findOne(id: string): Promise<Descuento> {
    const descuento = await this.descuentosRepository.findOne({
      where: { id },
    });
    if (!descuento) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado`);
    }
    return descuento;
  }

  async update(
    id: string,
    updateDescuentoDto: UpdateDescuentoDto,
  ): Promise<Descuento> {
    const descuento = await this.findOne(id);
    Object.assign(descuento, updateDescuentoDto);
    return this.descuentosRepository.save(descuento);
  }

  async remove(id: string): Promise<void> {
    const result = await this.descuentosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado`);
    }
  }
}
