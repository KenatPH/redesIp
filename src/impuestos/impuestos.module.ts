import { Module } from '@nestjs/common';
import { ImpuestosService } from './impuestos.service';
import { ImpuestosController } from './impuestos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impuesto } from './entities/impuesto.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Impuesto])],

  controllers: [ImpuestosController],
  providers: [ImpuestosService],
})
export class ImpuestosModule {}
