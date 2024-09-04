import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProvedorescategoryDto {
  @ApiProperty({ description: 'El nombre de la ciudad', example: 'Caracas' })
  @IsString()
  nombrecategoria: string;
}
