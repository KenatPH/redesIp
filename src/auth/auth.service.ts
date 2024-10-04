import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    private readonly MAX_ATTEMPTS = 3; // Número máximo de intentos permitidos

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const { email, password } = loginUserDto;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verificar si la cuenta está confirmada
        if (!user.confirmed) {
            throw new BadRequestException('Cuenta no confirmada. Por favor, verifica tu correo.');
        }

        // Verificar si el usuario ha excedido el número de intentos
        if (user.attempts >= this.MAX_ATTEMPTS) {
            throw new BadRequestException('Cuenta bloqueada. Demasiados intentos fallidos.');
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Aumentar el número de intentos si la contraseña es incorrecta
            // user.attempts += 1;
            // await this.userRepository.save(user);
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        // Restablecer los intentos si la autenticación es exitosa
        user.attempts = 0;
        await this.userRepository.save(user);

        const payload = { email: user.email, sub: user._id };

        // Retornar un token o un mensaje exitoso
        return {access_token: this.jwtService.sign(payload),
            user: user,
        };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        // Aquí deberías comparar la contraseña con la almacenada, usando bcrypt o similar
        if (user && user.password === password) {
            // Asegúrate de nunca almacenar contraseñas en texto plano en producción
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
