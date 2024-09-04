import { Module } from '@nestjs/common';
import { ProvedorescategoryService } from './provedorescategory.service';
import { ProvedorescategoryController } from './provedorescategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaProveedor } from './entities/provedorescategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaProveedor])],
  controllers: [ProvedorescategoryController],
  providers: [ProvedorescategoryService],
})
export class ProvedorescategoryModule {}
