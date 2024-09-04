import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateItemProductoDto {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  itemId: string;

  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  productId: string;

  @IsString()
  @ApiProperty({ example: 'Valor del ítem' })
  valor: string;
}
