import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule { }
