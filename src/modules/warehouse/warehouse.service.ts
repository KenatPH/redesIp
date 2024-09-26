import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from 'src/entities/warehouse.entity';  // Asegúrate de ajustar la ruta

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
        return await this.warehouseRepository.findOne({ where: { id } });
    }


}
