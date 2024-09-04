import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Impuesto } from './entities/impuesto.entity';

import { CreateImpuestoDto } from './dto/create-impuesto.dto';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';

@Injectable()
export class ImpuestosService {
  constructor(
    @InjectRepository(Impuesto)
    private readonly ImpuestossRepository: Repository<Impuesto>,
  ) {}

  create(createImpuestosDto: CreateImpuestoDto): Promise<Impuesto> {
    const Impuestos = this.ImpuestossRepository.create(createImpuestosDto);
    return this.ImpuestossRepository.save(Impuestos);
  }

  findAll(): Promise<Impuesto[]> {
    return this.ImpuestossRepository.find();
  }

  async findOne(id: string): Promise<Impuesto> {
    const Impuestos = await this.ImpuestossRepository.findOne({
      where: { id },
    });
    if (!Impuestos) {
      throw new NotFoundException(`Impuestos con ID ${id} no encontrado`);
    }
    return Impuestos;
  }

  async update(
    id: string,
    updateImpuestosDto: UpdateImpuestoDto,
  ): Promise<Impuesto> {
    const Impuestos = await this.findOne(id);
    Object.assign(Impuestos, updateImpuestosDto);
    return this.ImpuestossRepository.save(Impuestos);
  }

  async remove(id: string): Promise<void> {
    const result = await this.ImpuestossRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Impuestos con ID ${id} no encontrado`);
    }
  }
}
