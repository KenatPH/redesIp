import { Module } from '@nestjs/common';
import { ClientcategoryService } from './clientcategory.service';
import { ClientcategoryController } from './clientcategory.controller';
import { Clientcategory } from './entities/clientcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Clientcategory])],
  controllers: [ClientcategoryController],
  providers: [ClientcategoryService],
})
export class ClientcategoryModule {}
