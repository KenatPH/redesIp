import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsBoolean } from 'class-validator';

export class ModulePermissionDto {
  @ApiProperty({
    description: 'ID del módulo',
    example: 'module-uuid-1',
  })
  @IsUUID()
  moduleId: string;

  @ApiProperty({ description: 'Permiso para crear', example: true })
  @IsBoolean()
  crear: boolean;

  @ApiProperty({ description: 'Permiso para editar', example: true })
  @IsBoolean()
  editar: boolean;

  @ApiProperty({ description: 'Permiso para eliminar', example: true })
  @IsBoolean()
  eliminar: boolean;
}
