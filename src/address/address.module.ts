import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from '../entities/Address.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule { }
