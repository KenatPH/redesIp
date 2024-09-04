import { Module } from '@nestjs/common';
import { ProductcategoryService } from './productcategory.service';
import { ProductcategoryController } from './productcategory.controller';
import { Productcategory } from './entities/productcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Productcategory])],
  controllers: [ProductcategoryController],
  providers: [ProductcategoryService],
})
export class ProductcategoryModule {}
