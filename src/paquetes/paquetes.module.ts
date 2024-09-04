import { Module } from '@nestjs/common';
import { PaqueteService } from './paquetes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Paquete } from './entities/paquete.entity';
import { PaqueteController } from './paquetes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paquete, User, Product])],
  controllers: [PaqueteController],
  providers: [PaqueteService],
})
export class PaquetesModule {}
