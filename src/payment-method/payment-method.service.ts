import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { ObjectId } from 'mongodb';
import { PaymentMethod } from 'entities/PaymentMethod.entity';
import { EncryptionService } from 'common/encryption/encryption.service';

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectRepository(PaymentMethod)
        private paymentMethodRepository: Repository<PaymentMethod>,
        private encryptionService: EncryptionService, // Inyecta el servicio de encriptación
    ) { }

    async createPaymentMethod(userId: string, createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        const encryptedCardNumber = this.encryptionService.encrypt(createPaymentMethodDto.cardNumber);
        const newPaymentMethod = this.paymentMethodRepository.create({
            userId,
            ...createPaymentMethodDto,
            cardNumber: encryptedCardNumber, // Guarda el número de tarjeta encriptado
            lastFourDigits: createPaymentMethodDto.cardNumber.slice(-4),
        });
        return this.paymentMethodRepository.save(newPaymentMethod);
    }

    async updatePaymentMethod(id: string, updateData: Partial<CreatePaymentMethodDto>): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentMethodRepository.findOne({ where: { _id: new ObjectId(id) } });
        if (!paymentMethod) {
            throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
        }

        if (updateData.cardNumber) {
            updateData.cardNumber = this.encryptionService.encrypt(updateData.cardNumber); // Encripta el nuevo número de tarjeta
        }

        Object.assign(paymentMethod, updateData);
        return this.paymentMethodRepository.save(paymentMethod);
    }

    async removePaymentMethod(id: string): Promise<void> {
        const result = await this.paymentMethodRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
        }
    }

    async getPaymentMethodsByUserId(userId: string): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.find({ where: { userId } });
    }
}
