import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({
        description: 'ID del usuario que recibe la notificación',
        example: '607c191e810c19729de860ea', // Ejemplo de ID
    })
    @IsString()
    @IsNotEmpty()
    userId: string;  // ID del usuario que recibe la notificación

    @ApiProperty({
        description: 'Mensaje de la notificación',
        example: 'Tienes un nuevo mensaje en tu bandeja de entrada', // Ejemplo de mensaje
    })
    @IsString()
    @IsNotEmpty()
    message: string; // Mensaje de la notificación

    @ApiProperty({
        description: 'Estado de lectura de la notificación',
        default: false, // Valor por defecto
        required: false, // Este campo es opcional
    })
    @IsBoolean()
    isRead?: boolean; // Estado de lectura de la notificación (opcional, por defecto es false)
}
