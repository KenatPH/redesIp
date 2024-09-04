import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModulePermissionDto } from './module-permission.dto';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({ description: 'El nombre del rol', example: 'Administrador' })
  @IsString()
  @IsNotEmpty()
  nombrerol: string;

  @ApiProperty({
    description: 'Lista de permisos de módulos asociados al rol',
    type: [ModulePermissionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModulePermissionDto)
  modulePermissions: ModulePermissionDto[];
}
