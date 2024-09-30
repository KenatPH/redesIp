import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
    @ApiProperty({
        description: 'Tipo de tarjeta (ej: "Visa", "MasterCard")',
        example: 'Visa', // Ejemplo del tipo de tarjeta
    })
    @IsString()
    @IsNotEmpty()
    cardType: string;

    @ApiProperty({
        description: 'Número de la tarjeta de crédito o débito (será encriptado)',
        example: '4111111111111111', // Ejemplo de un número de tarjeta
    })
    @IsString()
    @IsNotEmpty()
    cardNumber: string; // Debe ser encriptado en el servicio

    @ApiProperty({
        description: 'Fecha de expiración de la tarjeta (MM/YY)',
        example: '12/25', // Ejemplo de la fecha de expiración
    })
    @IsString()
    @IsNotEmpty()
    expirationDate: string;

    @ApiProperty({
        description: 'Si este es el método de pago predeterminado',
        default: false, // Valor por defecto
        required: false, // Opcional
    })
    @IsBoolean()
    isDefault?: boolean; // Opcional
}
