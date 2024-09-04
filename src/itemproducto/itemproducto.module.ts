import { Module } from '@nestjs/common';
import { ItemproductoController } from './itemproducto.controller';
import { ItemProducto } from './entities/itemproducto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemProductoService } from './itemproducto.service';
import { Item } from 'src/item/entities/item.entity';
import { Product } from 'src/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemProducto, Item, Product])],
  controllers: [ItemproductoController],
  providers: [ItemProductoService],
})
export class ItemproductoModule {}
