import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role as RoleEntity } from '../entity/role.entity';
import { RoleModule } from 'src/entity/role-module.entity';
import { Module as ModuleEntity } from '../entity/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleModule, ModuleEntity])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
