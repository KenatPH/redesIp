import { Module } from '@nestjs/common';
import { ProvedoresController } from './provedores.controller';
import { ProvedoresService } from './provedores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import { CategoriaProveedor } from 'src/provedorescategory/entities/provedorescategory.entity';
import { Proveedor } from './entities/provedore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor, Pais, Ciudad, CategoriaProveedor]),
  ],
  controllers: [ProvedoresController],
  providers: [ProvedoresService],
})
export class ProvedoresModule {}
