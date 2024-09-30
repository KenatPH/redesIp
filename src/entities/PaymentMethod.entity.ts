import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('payment_methods')
export class PaymentMethod {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: string; // Relación con el usuario

    @Column()
    cardType: string; // Ej: 'Visa', 'MasterCard'

    @Column()
    lastFourDigits: string; // Almacenar solo los últimos 4 dígitos de la tarjeta

    @Column({ select: false })
    cardNumber: string; // Almacenar el número de tarjeta de forma segura (encriptado)

    @Column()
    expirationDate: string; // Fecha de expiración

    @Column({ default: false })
    isDefault: boolean; // Indica si es el método de pago predeterminado
}
