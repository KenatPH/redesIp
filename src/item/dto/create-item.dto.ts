import { IsString, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'El nombre del ítem',
    example: 'Nombre del ítem',
  })
  @IsString()
  nombreitem: string;

  @ApiProperty({
    description: 'Estado del ítem (activo/inactivo)',
    example: true,
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    description: 'El tipo del ítem (text, number, date)',
    example: 'text',
  })
  @IsString()
  @IsIn(['text', 'number', 'date'])
  tipo: string;
}
