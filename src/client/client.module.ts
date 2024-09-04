import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientcategory } from 'src/clientcategory/entities/clientcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Clientcategory])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
