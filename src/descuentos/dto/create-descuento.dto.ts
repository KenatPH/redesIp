import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDescuentoDto {
  @IsNumber()
  @ApiProperty({ description: 'El porcentaje del descuento', example: 5.0 })
  porcentaje: number;

  @IsString()
  @ApiProperty({
    description: 'El título del descuento',
    example: 'dia de las madres',
  })
  titulo: string;
}
