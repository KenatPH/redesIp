import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemProductoDto } from './dto/create-itemproducto.dto';
import { UpdateItemProductoDto } from './dto/update-itemproducto.dto';
import { ItemProducto } from './entities/itemproducto.entity';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ItemProductoService {
  constructor(
    @InjectRepository(ItemProducto)
    private readonly itemProductoRepository: Repository<ItemProducto>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createItemProductoDto: CreateItemProductoDto) {
    const item = await this.itemRepository.findOneBy({
      id: createItemProductoDto.itemId,
    });
    const product = await this.productRepository.findOneBy({
      id: createItemProductoDto.productId,
    });

    if (!item || !product) {
      throw new NotFoundException('Item o Producto no encontrado');
    }

    const itemProducto = new ItemProducto();
    itemProducto.item = item;
    itemProducto.product = product;
    itemProducto.valor = createItemProductoDto.valor;

    return this.itemProductoRepository.save(itemProducto);
  }

  findAll(): Promise<ItemProducto[]> {
    return this.itemProductoRepository.find({ relations: ['item'] });
  }

  async findOne(id: string): Promise<ItemProducto> {
    const itemProducto = await this.itemProductoRepository.findOne({
      where: { id },
      relations: ['item'],
    });
    if (!itemProducto) {
      throw new NotFoundException(`ItemProducto con ID ${id} no encontrado`);
    }
    return itemProducto;
  }

  async update(
    id: string,
    updateItemProductoDto: UpdateItemProductoDto,
  ): Promise<ItemProducto> {
    const itemProducto = await this.findOne(id);

    if (updateItemProductoDto.itemId) {
      const item = await this.itemRepository.findOne({
        where: { id: updateItemProductoDto.itemId },
      });
      if (!item) {
        throw new NotFoundException(
          `Ítem con ID ${updateItemProductoDto.itemId} no encontrado`,
        );
      }
      itemProducto.item = item;
    }

    Object.assign(itemProducto, updateItemProductoDto);
    return this.itemProductoRepository.save(itemProducto);
  }

  async remove(id: string): Promise<void> {
    const itemProducto = await this.findOne(id);
    await this.itemProductoRepository.remove(itemProducto);
  }
}
