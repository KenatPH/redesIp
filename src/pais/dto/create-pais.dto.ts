import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaisDto {
  @ApiProperty({ description: 'El nombre del país', example: 'Venezuela' })
  @IsString()
  nombrepais: string;
}
