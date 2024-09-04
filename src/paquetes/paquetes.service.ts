import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paquete } from './entities/paquete.entity';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class PaqueteService {
  constructor(
    @InjectRepository(Paquete)
    private readonly paqueteRepository: Repository<Paquete>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createPaqueteDto: CreatePaqueteDto): Promise<Paquete> {
    const productos = await this.productRepository.findByIds(
      createPaqueteDto.productosIds,
    );

    if (productos.length === 0) {
      throw new NotFoundException(
        'No se encontraron los productos especificados',
      );
    }

    // Verificar el estado de user y productos antes de crear el paquete
    console.log('Productos:', productos);

    const paquete = this.paqueteRepository.create({
      ...createPaqueteDto,
      productos,
    });

    // Verificar el estado de paquete antes de guardar
    console.log('Paquete:', paquete);

    return this.paqueteRepository.save(paquete);
  }

  async findAll(): Promise<Paquete[]> {
    return this.paqueteRepository.find({ relations: ['usuario', 'productos'] });
  }

  async findOne(id: string): Promise<Paquete> {
    const paquete = await this.paqueteRepository.findOne({
      where: { id },
      relations: ['usuario', 'productos'],
    });
    if (!paquete) {
      throw new NotFoundException('Paquete no encontrado');
    }
    return paquete;
  }

  async update(
    id: string,
    updatePaqueteDto: UpdatePaqueteDto,
  ): Promise<Paquete> {
    const paquete = await this.findOne(id);

    if (updatePaqueteDto.productosIds) {
      const productos = await this.productRepository.findByIds(
        updatePaqueteDto.productosIds,
      );
      if (productos.length === 0) {
        throw new NotFoundException(
          'No se encontraron los productos especificados',
        );
      }
      paquete.productos = productos;
    }

    Object.assign(paquete, updatePaqueteDto);
    return this.paqueteRepository.save(paquete);
  }

  async remove(id: string): Promise<void> {
    const paquete = await this.findOne(id);
    await this.paqueteRepository.remove(paquete);
  }
}
