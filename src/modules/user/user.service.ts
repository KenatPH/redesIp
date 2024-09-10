import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ObjectId, Repository, MoreThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Para generar tokens únicos
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ForgotPasswordDto, ResetPasswordDto } from 'src/dto/manager-password.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
    }
    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { email }
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            // Verificar si el correo ya está en uso
            const emailExists = await this.userRepository.findOne({
                where: { email: createUserDto.email }
            });

            if (emailExists) {
                throw new BadRequestException('El correo ya está en uso');
            }

            // Crear una instancia del usuario
            const user = this.userRepository.create(createUserDto);

            // Encriptar la contraseña
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;

            // Guardar el usuario en la base de datos
            const savedUser = await this.userRepository.save(user);

            // Generar token de confirmación
            const confirmationToken = uuidv4();
            savedUser.resetPasswordToken = confirmationToken;

            // Actualizar el usuario con el token de confirmación
            await this.userRepository.save(savedUser);

            // Enviar correo de confirmación
            await this.mailService.sendConfirmationEmail(savedUser.email, confirmationToken);

            return savedUser;

        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocurrió un error interno.');
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            // Validar que el ID sea válido
            if (!ObjectId.isValid(id)) {
                throw new BadRequestException('ID de usuario inválido');
            }

            const objectId = new ObjectId(id);

            // Verificar si el correo ya existe y no pertenece al usuario actual
            const emailExists = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
                select: ['_id'],
            });

            if (emailExists && emailExists._id.toString() !== id) {
                throw new BadRequestException('El correo ya está en uso por otro usuario');
            }

            // Buscar el usuario por su ID
            const user = await this.userRepository.findOne({
                where: { _id: objectId }
            });

            if (!user) {
                throw new NotFoundException('El usuario especificado no existe.');
            }

            // Actualizar los datos del usuario
            this.userRepository.merge(user, updateUserDto);

            const response: User = await this.userRepository.save(user);

            // Retornar el usuario actualizado
            return this.findOne(response._id.toString());
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al actualizar el usuario', error.message);
        }
    }

    async updateUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }


    async requestPasswordReset(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: { email: forgotPasswordDto.email } });

        if (!user) {
            throw new BadRequestException('El usuario no existe');
        }

        // Generar token de recuperación
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = new Date();
        resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1); // Expira en 1 hora

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;

        await this.userRepository.save(user);

        // Enviar correo de recuperación
        // const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await this.mailService.sendforgotpasswordEmail(user.email, resetToken);
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        const user = await this.userRepository.findOne({
            where: {
                resetPasswordToken: resetPasswordDto.token,
                resetPasswordExpires:  MoreThan(new Date()) , // Verificar que el token no haya expirado
            },
        });

        if (!user) {
            throw new BadRequestException('Token inválido o ha expirado');
        }

        user.password = resetPasswordDto.password; // Asegúrate de hashear la contraseña
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await this.userRepository.save(user);
    }

    async findByConfirmationToken(token: string): Promise<User> {
        return await this.userRepository.findOne({ where: { resetPasswordToken: token } });
    }




}