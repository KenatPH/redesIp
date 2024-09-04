import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Título del módulo',
    example: 'Gestión de Usuarios',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Ícono del módulo', example: 'user-icon' })
  @IsString()
  @IsNotEmpty()
  icono: string;

  @ApiProperty({ description: 'Ruta del módulo', example: '/users' })
  @IsString()
  @IsNotEmpty()
  path: string;
}
