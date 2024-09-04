import { Module } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { DescuentosController } from './descuentos.controller';
import { Descuento } from './entities/descuento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Descuento])],
  controllers: [DescuentosController],
  providers: [DescuentosService],
})
export class DescuentosModule {}
