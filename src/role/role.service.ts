import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { Role  } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ){}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const { name } = createRoleDto;

        // Crear el rol
        const role = this.roleRepository.create({ name });
        
        return await this.roleRepository.save(role); // Devolver el rol con sus módulos cargados
    }

    async findOne(id: string): Promise<Role> {
        const objectId = new ObjectId(id);
        const role = await this.roleRepository.findOne({ where: { _id: objectId } });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        return role;
    }

    findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

}
