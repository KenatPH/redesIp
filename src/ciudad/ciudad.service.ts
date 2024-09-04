import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Pais } from 'src/pais/entities/pais.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const pais = await this.paisRepository.findOne({
      where: { id: createCiudadDto.paisId },
    });
    if (!pais) {
      throw new NotFoundException(
        `País con ID ${createCiudadDto.paisId} no encontrado`,
      );
    }

    const ciudad = this.ciudadRepository.create({
      ...createCiudadDto,
      pais,
    });

    return this.ciudadRepository.save(ciudad);
  }

  findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find({ relations: ['pais'] });
  }

  async findOne(id: string): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id },
      relations: ['pais'],
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }
    return ciudad;
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.findOne(id);

    if (updateCiudadDto.paisId) {
      const pais = await this.paisRepository.findOne({
        where: { id: updateCiudadDto.paisId },
      });
      if (!pais) {
        throw new NotFoundException(
          `País con ID ${updateCiudadDto.paisId} no encontrado`,
        );
      }
      ciudad.pais = pais;
    }

    Object.assign(ciudad, updateCiudadDto);
    return this.ciudadRepository.save(ciudad);
  }

  async remove(id: string): Promise<void> {
    const ciudad = await this.findOne(id);
    await this.ciudadRepository.remove(ciudad);
  }
}
