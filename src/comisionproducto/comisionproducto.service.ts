import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';
import { CreateComisionProductoDto } from './dto/create-comisionproducto.dto';
import { UpdateComisionProductoDto } from './dto/update-comisionproducto.dto';
import { ComisionProducto } from './entities/comisionproducto.entity';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ComisionProductoService {
  constructor(
    @InjectRepository(ComisionProducto)
    private readonly comisionProductoRepository: Repository<ComisionProducto>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createComisionProductoDto: CreateComisionProductoDto,
  ): Promise<ComisionProducto> {
    const { productId, roleId, porcentaje, aplica } = createComisionProductoDto;

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${roleId} no encontrado`);
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Rol con ID ${productId} no encontrado`);
    }

    const comisionProducto = this.comisionProductoRepository.create({
      product,
      role,
      porcentaje,
      aplica,
    });

    return this.comisionProductoRepository.save(comisionProducto);
  }

  findAll(): Promise<ComisionProducto[]> {
    return this.comisionProductoRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<ComisionProducto> {
    const comisionProducto = await this.comisionProductoRepository.findOne({
      where: { id },
      relations: ['role', 'product'],
    });
    if (!comisionProducto) {
      throw new NotFoundException(
        `ComisionProducto con ID ${id} no encontrado`,
      );
    }
    return comisionProducto;
  }

  async update(
    id: string,
    updateComisionProductoDto: UpdateComisionProductoDto,
  ): Promise<ComisionProducto> {
    const comisionProducto = await this.findOne(id);

    if (updateComisionProductoDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: updateComisionProductoDto.roleId },
      });
      if (!role) {
        throw new NotFoundException(
          `Rol con ID ${updateComisionProductoDto.roleId} no encontrado`,
        );
      }
      comisionProducto.role = role;
    }

    Object.assign(comisionProducto, updateComisionProductoDto);
    return this.comisionProductoRepository.save(comisionProducto);
  }

  async remove(id: string): Promise<void> {
    const comisionProducto = await this.findOne(id);
    await this.comisionProductoRepository.remove(comisionProducto);
  }

  async findByProductId(productId: string): Promise<ComisionProducto[]> {
    return this.comisionProductoRepository.find({
      where: { product: { id: productId } },
      relations: ['role', 'product'],
    });
  }
}
