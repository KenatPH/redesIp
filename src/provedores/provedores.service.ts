import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/provedore.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import { CategoriaProveedor } from 'src/provedorescategory/entities/provedorescategory.entity';
import { CreateProvedoresDto } from './dto/create-provedores.dto';
import { UpdateProvedoresDto } from './dto/update-provedores.dto';

@Injectable()
export class ProvedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(CategoriaProveedor)
    private readonly categoriaProveedorRepository: Repository<CategoriaProveedor>,
  ) {}

  async create(createProveedorDto: CreateProvedoresDto): Promise<Proveedor> {
    const { paisId, ciudadId, categorias, ...rest } = createProveedorDto;

    const pais = await this.paisRepository.findOne({ where: { id: paisId } });
    if (!pais) {
      throw new NotFoundException(`País con ID ${paisId} no encontrado`);
    }

    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);
    }

    const categoriaEntities =
      await this.categoriaProveedorRepository.findByIds(categorias);

    const proveedor = this.proveedorRepository.create({
      ...rest,
      pais,
      ciudad,
      categorias: categoriaEntities,
    });

    return this.proveedorRepository.save(proveedor);
  }

  findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      relations: ['pais', 'ciudad', 'categorias', 'product'],
    });
  }

  async findOne(id: string): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['pais', 'ciudad', 'categorias', 'product'],
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  async update(
    id: string,
    updateProveedorDto: UpdateProvedoresDto,
  ): Promise<Proveedor> {
    const proveedor = await this.findOne(id);

    if (updateProveedorDto.paisId) {
      const pais = await this.paisRepository.findOne({
        where: { id: updateProveedorDto.paisId },
      });
      if (!pais) {
        throw new NotFoundException(
          `País con ID ${updateProveedorDto.paisId} no encontrado`,
        );
      }
      proveedor.pais = pais;
    }

    if (updateProveedorDto.ciudadId) {
      const ciudad = await this.ciudadRepository.findOne({
        where: { id: updateProveedorDto.ciudadId },
      });
      if (!ciudad) {
        throw new NotFoundException(
          `Ciudad con ID ${updateProveedorDto.ciudadId} no encontrada`,
        );
      }
      proveedor.ciudad = ciudad;
    }

    if (updateProveedorDto.categorias) {
      const categoriaEntities =
        await this.categoriaProveedorRepository.findByIds(
          updateProveedorDto.categorias,
        );
      proveedor.categorias = categoriaEntities;
    }

    Object.assign(proveedor, updateProveedorDto);
    const response: Proveedor = await this.proveedorRepository.save(proveedor);
    return this.findOne(response.id);
  }

  async remove(id: string): Promise<void> {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.remove(proveedor);
  }
}
