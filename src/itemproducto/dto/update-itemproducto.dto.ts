import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateItemProductoDto } from './create-itemproducto.dto';

export class UpdateItemProductoDto extends PartialType(CreateItemProductoDto) {
  @ApiPropertyOptional({
    description: 'ID del ítem asociado al producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @ApiPropertyOptional({
    description: 'El valor asociado al ítem para el producto',
    example: 'Valor del ítem',
  })
  @IsOptional()
  @IsString()
  valor?: string;
}
