import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from 'src/entities/Warehouse.entity';  // Asegúrate de ajustar la ruta
import { ObjectId } from 'mongodb';

@Injectable()
export class WarehouseService {

    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,
    ) { }

    // Obtener todos los almacenes 
    async findAll(): Promise<Warehouse[]> {

        return await this.warehouseRepository.find();
    }

    // Obtener un almacén por su ID
    async findOne(id: string): Promise<Warehouse> {
        // return await this.warehouseRepository.findOne({ where: { id } });

        const warehouse = await this.warehouseRepository.findOne({ where: { _id: new ObjectId(id) } });

        if (!warehouse) {
            throw new NotFoundException('warehouse not found');
        }

        return warehouse
    }


}
