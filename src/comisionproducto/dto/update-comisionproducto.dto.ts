import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsNumber, IsIn } from 'class-validator';
import { CreateComisionProductoDto } from './create-comisionproducto.dto';

export class UpdateComisionProductoDto extends PartialType(
  CreateComisionProductoDto,
) {
  @ApiProperty({
    description: 'ID del rol asociado al producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiProperty({
    description: 'ID del producto asociado la comision',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({
    description: 'El porcentaje de la comisión',
    example: 5.0,
  })
  @IsOptional()
  @IsNumber()
  porcentaje?: number;

  @ApiPropertyOptional({
    description: 'A qué se aplica la comisión (pvp, neto, diferencia)',
    example: 'pvp',
  })
  @IsOptional()
  @IsString()
  @IsIn(['pvp', 'neto', 'diferencia'])
  aplica?: string;
}
