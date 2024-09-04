import { IsString, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'El nombre del producto', example: 'Traslado' })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Indica si el producto está activo',
    example: true,
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    description: 'Lista de IDs de categorías asociadas al proveedor',
    type: [String],
    example: ['category-uuid-1', 'category-uuid-2'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  categorias: string[];

  @ApiProperty({
    description: 'El identificador único del provedor asociado al prducto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  provedorId: string;
}
