import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCiudadDto {
  @ApiProperty({ description: 'El nombre de la ciudad', example: 'Caracas' })
  @IsString()
  nombreciudad: string;

  @ApiProperty({
    description: 'ID del país asociado a la ciudad',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  paisId: string;
}
