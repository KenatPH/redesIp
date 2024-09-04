import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import {
  IsOptional,
  ValidateNested,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ModulePermissionDto } from './module-permission.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ description: 'El nombre del rol', example: 'Administrador' })
  @IsString()
  @IsNotEmpty()
  nombrerol: string;

  @ApiPropertyOptional({
    description: 'Lista de permisos de módulos asociados al rol',
    type: [ModulePermissionDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModulePermissionDto)
  modulePermissions?: ModulePermissionDto[];
}
