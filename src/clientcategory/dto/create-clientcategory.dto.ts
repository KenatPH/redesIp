import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientcategoryDto {
  @IsNumber()
  @ApiProperty({ description: 'Monto gastado en compras', example: 150.75 })
  montogastado: number;

  @ApiProperty({ description: 'Nombres del cliente', example: 'John' })
  @IsString()
  nombres: string;

  @IsNumber()
  @ApiProperty({
    description: 'Valor total de productos premium comprados',
    example: 250.99,
  })
  productospremium: number;

  @IsNumber()
  @ApiProperty({
    description: 'Frecuencia de compra promedio en días',
    example: 30.0,
  })
  frecuenciadecompra: number;
}
