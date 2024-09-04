import { IsString, IsUUID, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComisionProductoDto {
  @ApiProperty({
    description: 'ID del rol asociado al producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  roleId: string;

  @ApiProperty({
    description: 'ID del producto asociado la comision',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'El porcentaje de la comisión', example: 5.0 })
  @IsNumber()
  porcentaje: number;

  @ApiProperty({
    description: 'A qué se aplica la comisión (pvp, neto, diferencia)',
    example: 'pvp',
  })
  @IsString()
  @IsIn(['pvp', 'neto', 'diferencia'])
  aplica: string;
}
