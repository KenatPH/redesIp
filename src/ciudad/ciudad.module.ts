import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { Ciudad } from './entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from 'src/pais/entities/pais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Pais])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
