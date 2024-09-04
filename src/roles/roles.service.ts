import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './create-role.dto';
import { UpdateRoleDto } from './update-role.dto';
import { Role } from 'src/entity/role.entity';
import { RoleModule } from 'src/entity/role-module.entity';
import { Module } from 'src/entity/module.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(RoleModule)
    private roleModuleRepository: Repository<RoleModule>,

    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { nombrerol, modulePermissions } = createRoleDto;

    // Crear el rol
    const role = this.roleRepository.create({ nombrerol });
    await this.roleRepository.save(role);

    // Crear los RoleModules asociados
    for (const modulePermission of modulePermissions) {
      const module = await this.moduleRepository.findOne({
        where: { id: modulePermission.moduleId },
      });
      if (!module) {
        throw new NotFoundException(
          `Module with ID ${modulePermission.moduleId} not found`,
        );
      }

      const roleModule = this.roleModuleRepository.create({
        role,
        module,
        crear: modulePermission.crear,
        editar: modulePermission.editar,
        eliminar: modulePermission.eliminar,
      });

      await this.roleModuleRepository.save(roleModule);
    }

    return this.findOne(role.id); // Devolver el rol con sus módulos cargados
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['roleModules', 'roleModules.module'],
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['roleModules', 'roleModules.module'],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Ordenar los módulos por el campo `order`
    role.roleModules.sort((a, b) => a.module.order - b.module.order);

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Actualizar el nombre del rol
    role.nombrerol = updateRoleDto.nombrerol;
    await this.roleRepository.save(role);

    // Actualizar los RoleModules asociados
    if (updateRoleDto.modulePermissions) {
      // Eliminar los RoleModules existentes
      await this.roleModuleRepository.delete({ role });

      // Crear los nuevos RoleModules
      for (const modulePermission of updateRoleDto.modulePermissions) {
        const module = await this.moduleRepository.findOne({
          where: { id: modulePermission.moduleId },
        });
        if (!module) {
          throw new NotFoundException(
            `Module with ID ${modulePermission.moduleId} not found`,
          );
        }

        const roleModule = this.roleModuleRepository.create({
          role,
          module,
          crear: modulePermission.crear,
          editar: modulePermission.editar,
          eliminar: modulePermission.eliminar,
        });

        await this.roleModuleRepository.save(roleModule);
      }
    }

    return this.findOne(id);
  }

  async findModulesByRoleId(roleId: string) {
    const role = await this.findOne(roleId);
    return role.roleModules.map((roleModule) => roleModule.module);
  }
}
