import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createAddress(userId: string, createAddressDto: CreateAddressDto): Promise<Address> {
        const user = await this.userRepository.findOne({ where: { _id: new ObjectId(userId) } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        const newAddress = this.addressRepository.create({ ...createAddressDto, user });
        return this.addressRepository.save(newAddress);
    }

    async getAddressesByUserId(userId: string): Promise<Address[]> {
        return this.addressRepository.find({ where: { user: { _id: new ObjectId(userId) } } });
    }

    async updateAddress(addressId: string, updateAddressDto: CreateAddressDto): Promise<Address> {
        const address = await this.addressRepository.findOne({ where: { _id: new ObjectId(addressId) } });
        if (!address) {
            throw new NotFoundException(`Dirección con ID ${addressId} no encontrada`);
        }

        Object.assign(address, updateAddressDto);
        return this.addressRepository.save(address);
    }

    async removeAddress(addressId: string): Promise<void> {
        const address = await this.addressRepository.findOne({ where: { _id: new ObjectId(addressId) } });
        if (!address) {
            throw new NotFoundException(`Dirección con ID ${addressId} no encontrada`);
        }
        await this.addressRepository.delete(addressId);
    }
}
