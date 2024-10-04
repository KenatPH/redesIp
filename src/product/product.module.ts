import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'entities/Product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from 'entities/Stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock])], 
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
