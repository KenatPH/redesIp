import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from 'src/entity/product.entity';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Productcategory } from 'src/productcategory/entities/productcategory.entity';
import { Proveedor } from 'src/provedores/entities/provedore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      Productcategory,
      Proveedor,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
