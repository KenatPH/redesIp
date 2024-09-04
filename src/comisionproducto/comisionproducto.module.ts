import { Module } from '@nestjs/common';
import { ComisionProductoService } from './comisionproducto.service';
import { ComisionproductoController } from './comisionproducto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComisionProducto } from './entities/comisionproducto.entity';
import { Product } from 'src/entity/product.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComisionProducto, Product, Role])],
  controllers: [ComisionproductoController],
  providers: [ComisionProductoService],
})
export class ComisionproductoModule {}
