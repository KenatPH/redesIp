import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Clientcategory } from 'src/clientcategory/entities/clientcategory.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Clientcategory)
    private readonly clientCategoryRepository: Repository<Clientcategory>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { clientcategory, ...clientData } = createClientDto;

    let category = null;
    if (clientcategory) {
      category = await this.clientCategoryRepository.findOne({
        where: { id: clientcategory },
      });
      if (!category) {
        throw new NotFoundException(
          `Categoría de cliente con ID ${clientcategory} no encontrada`,
        );
      }
    }

    const client = this.clientRepository.create({
      ...clientData,
      clientcategory: category,
    });
    return this.clientRepository.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find({ relations: ['clientcategory'] });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['clientcategory'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    const { clientcategory, ...updateData } = updateClientDto;

    if (clientcategory) {
      const category = await this.clientCategoryRepository.findOne({
        where: { id: clientcategory },
      });
      if (!category) {
        throw new NotFoundException(
          `Categoría de cliente con ID ${clientcategory} no encontrada`,
        );
      }
      client.clientcategory = category;
    }

    Object.assign(client, updateData);
    return this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
