import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/Cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule { }
