import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProduct } from 'entities/FavoriteProduct.entity';
import { Product } from 'entities/Product.entity';
import { User } from 'entities/User.entity';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProductService } from './favorite-product.service';


@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct, User, Product])],
  providers: [FavoriteProductService],
  controllers: [FavoriteProductController],
})
export class FavoriteProductModule { }
