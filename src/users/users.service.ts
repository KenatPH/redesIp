import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Buscar el rol en la base de datos utilizando el roleId proporcionado
      const role = await this.rolesRepository.findOne({
        where: { id: createUserDto.roleId },
      });

      if (!role) {
        throw new Error('El rol especificado no existe');
      }

      const user = this.usersRepository.create({
        ...createUserDto,
        role, // Asociar el rol encontrado al usuario
      });

      const response: User = await this.usersRepository.save(user);
      return this.findOne(response.id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errMessage = (error as any).message;
        if (errMessage.includes('Duplicate entry')) {
          throw new ConflictException(
            'El correo electrónico ya está registrado.',
          );
        }
      }
      throw new InternalServerErrorException('Ocurrió un error interno.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const role = await this.rolesRepository.findOne({
        where: { id: updateUserDto.roleId },
      });

      if (!role) {
        throw new Error('El rol especificado no existe');
      }

      // Verifica si el correo electrónico ya existe en otro usuario
      const existingUser = await this.usersRepository.findOne({
        where: { correo: updateUserDto.correo },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          'El correo electrónico ya está registrado.',
        );
      }

      // Actualizar solo si el correo es del mismo usuario o no existe
      const user = await this.usersRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new NotFoundException('El usuario especificado no existe.');
      }

      this.usersRepository.merge(user, {
        ...updateUserDto,
        role, // Asociar el rol encontrado al usuario
      });

      const response: User = await this.usersRepository.save(user);
      return this.findOne(response.id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errMessage = (error as any).message;
        if (errMessage.includes('Duplicate entry')) {
          throw new ConflictException(
            'El correo electrónico ya está registrado.',
          );
        }
      }
      throw new InternalServerErrorException('Ocurrió un error interno.');
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['role', 'role.roleModules', 'role.roleModules.module'],
    });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id }, relations: ['role'] });
  }
}
