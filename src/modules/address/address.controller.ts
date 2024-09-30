import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post(':userId')
    @ApiOperation({ summary: 'Crear una nueva dirección para el usuario' })
    @ApiResponse({
        status: 201,
        description: 'La dirección fue creada exitosamente.',
        schema: {
            example: {
                type: "shipping",
                street: "Av. Bolivar",
                building: "Edificio Arrecife",
                country: "Vzla, Margarita",
                isDefault: true
            }
        }
    })
    async createAddress(
        @Param('userId') userId: string,
        @Body() createAddressDto: CreateAddressDto
    ) {
        return this.addressService.createAddress(userId, createAddressDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener todas las direcciones de un usuario' })
    @ApiResponse({
        status: 200,
        description: 'Se devuelve un array de direcciones del usuario.',
        schema: {
            example: [
                {
                    id: '507f1f77bcf86cd799439011',
                    type: "shipping",
                    street: "Av. Bolivar",
                    building: "Edificio Arrecife",
                    country: "Vzla, Margarita",
                    isDefault: true
                },
                {
                    id: '507f1f77bcf86cd799439012',
                    type: "billing",
                    street: "Calle 123",
                    building: "Edificio Mar",
                    country: "Vzla, Caracas",
                    isDefault: false
                }
            ]
        }
    })
    async getAddressesByUserId(@Param('userId') userId: string) {
        return this.addressService.getAddressesByUserId(userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una dirección existente' })
    @ApiResponse({
        status: 200,
        description: 'La dirección fue actualizada exitosamente.',
        schema: {
            example: {
                id: '507f1f77bcf86cd799439011',
                type: "shipping",
                street: "Av. Bolivar",
                building: "Edificio Arrecife",
                country: "Vzla, Margarita",
                isDefault: true
            }
        }
    })
    async updateAddress(
        @Param('id') addressId: string,
        @Body() updateAddressDto: CreateAddressDto
    ) {
        return this.addressService.updateAddress(addressId, updateAddressDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una dirección' })
    @ApiResponse({
        status: 200,
        description: 'La dirección fue eliminada exitosamente.',
        schema: {
            example: {
                message: 'Dirección eliminada exitosamente'
            }
        }
    })
    async removeAddress(@Param('id') addressId: string) {
        return this.addressService.removeAddress(addressId);
    }
}
