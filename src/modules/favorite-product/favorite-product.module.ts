import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProduct } from 'src/entities/FavoriteProduct.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProductService } from './favorite-product.service';


@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct, User, Product])],
  providers: [FavoriteProductService],
  controllers: [FavoriteProductController],
})
export class FavoriteProductModule { }
