import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('payment-methods')
@Controller('payment-methods')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService: PaymentMethodService) { }

    @Post(':userId')
    @ApiOperation({ summary: 'Crear un nuevo método de pago para el usuario' })
    @ApiResponse({ status: 201, description: 'Método de pago creado exitosamente.' })
    async createPaymentMethod(
        @Param('userId') userId: string,
        @Body() createPaymentMethodDto: CreatePaymentMethodDto
    ) {
        return this.paymentMethodService.createPaymentMethod(userId, createPaymentMethodDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener todos los métodos de pago de un usuario' })
    @ApiResponse({ status: 200, description: 'Métodos de pago recuperados exitosamente.' })
    async getPaymentMethodsByUserId(@Param('userId') userId: string) {
        return this.paymentMethodService.getPaymentMethodsByUserId(userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un método de pago existente' })
    @ApiResponse({ status: 200, description: 'Método de pago actualizado exitosamente.' })
    async updatePaymentMethod(
        @Param('id') id: string,
        @Body() updatePaymentMethodDto: CreatePaymentMethodDto
    ) {
        return this.paymentMethodService.updatePaymentMethod(id, updatePaymentMethodDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un método de pago' })
    @ApiResponse({ status: 200, description: 'Método de pago eliminado exitosamente.' })
    async removePaymentMethod(@Param('id') id: string) {
        return this.paymentMethodService.removePaymentMethod(id);
    }
}
