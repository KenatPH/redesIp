import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from 'src/entities/address.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule { }
