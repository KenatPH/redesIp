import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateImpuestoDto {
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
