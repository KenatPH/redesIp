import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethod } from 'entities/PaymentMethod.entity';
import { EncryptionService } from 'common/encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, EncryptionService],
  exports: [PaymentMethodService], // Exportar si se necesita en otros módulos
})
export class PaymentMethodModule { }
