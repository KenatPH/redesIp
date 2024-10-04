import { Controller, Get, Param } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from 'entities/Warehouse.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('warehouse')  // Etiqueta para Swagger
@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los almacenes' })
    async findAll(): Promise<Warehouse[]> {
        return await this.warehouseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un almacén por ID' })
    async findOne(@Param('id') id: string): Promise<Warehouse> {
        return await this.warehouseService.findOne(id);
    }
}
