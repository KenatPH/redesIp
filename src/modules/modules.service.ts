import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from '../entity/module.entity';
import { CreateModuleDto } from './create-module.dto';
import { UpdateModuleDto } from './update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private modulesRepository: Repository<Module>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    const module = this.modulesRepository.create(createModuleDto);
    return this.modulesRepository.save(module);
  }

  async findAll(): Promise<Module[]> {
    return this.modulesRepository.find();
  }

  async findOne(id: string): Promise<Module> {
    return this.modulesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module> {
    await this.modulesRepository.update(id, updateModuleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.modulesRepository.delete(id);
  }
}
