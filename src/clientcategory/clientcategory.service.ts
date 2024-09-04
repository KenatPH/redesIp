import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientcategoryDto } from './dto/create-clientcategory.dto';
import { UpdateClientcategoryDto } from './dto/update-clientcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientcategory } from './entities/clientcategory.entity';

@Injectable()
export class ClientcategoryService {
  constructor(
    @InjectRepository(Clientcategory)
    private readonly clientcategoryRepository: Repository<Clientcategory>,
  ) {}

  async create(
    createClientcategoryDto: CreateClientcategoryDto,
  ): Promise<Clientcategory> {
    const clientcategory = this.clientcategoryRepository.create(
      createClientcategoryDto,
    );
    return this.clientcategoryRepository.save(clientcategory);
  }

  async findAll(): Promise<Clientcategory[]> {
    return this.clientcategoryRepository.find();
  }

  async findOne(id: string): Promise<Clientcategory> {
    const clientcategory = await this.clientcategoryRepository.findOne({
      where: { id },
    });
    if (!clientcategory) {
      throw new NotFoundException(`Clientcategory with ID ${id} not found`);
    }
    return clientcategory;
  }

  async update(
    id: string,
    updateClientcategoryDto: UpdateClientcategoryDto,
  ): Promise<Clientcategory> {
    const clientcategory = await this.clientcategoryRepository.preload({
      id,
      ...updateClientcategoryDto,
    });
    if (!clientcategory) {
      throw new NotFoundException(`Clientcategory with ID ${id} not found`);
    }
    return this.clientcategoryRepository.save(clientcategory);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clientcategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Clientcategory with ID ${id} not found`);
    }
  }
}
