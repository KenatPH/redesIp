import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
    @ApiProperty({
        description: 'Tipo de dirección (ej: "shipping")',
        example: 'shipping', // Ejemplo de tipo
    })
    @IsNotEmpty()
    @IsString()
    type: string; // Ej: "shipping"

    @ApiProperty({
        description: 'Calle de la dirección',
        example: 'Av. Bolivar', // Ejemplo de calle
    })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({
        description: 'Edificio de la dirección',
        example: 'Edificio Arrecife', // Ejemplo de edificio
    })
    @IsNotEmpty()
    @IsString()
    building: string;

    @ApiProperty({
        description: 'País de la dirección',
        example: 'Vzla, Margarita', // Ejemplo de país
    })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({
        description: 'Si es la dirección predeterminada',
        default: false, // Valor por defecto
        required: false, // Este campo es opcional
    })
    @IsBoolean()
    isDefault?: boolean; // Si se proporciona, puede establecerse como true o false
}
