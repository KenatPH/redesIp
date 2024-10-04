import { BadRequestException, Controller, Get, Post, Query, UseGuards, Request, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { ForgotPasswordDto, ResetPasswordDto } from 'src/dto/manager-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @ApiOperation({ summary: 'Confirmar correo del usuario' })
    @Get('confirm')
    async confirmEmail(@Query('token') token: string) {
        const user = await this.userService.findByConfirmationToken(token);

        if (!user) {
            throw new BadRequestException('Token inválido o expirado');
        }

        user.confirmed = true;
        user.resetPasswordToken = null; // Limpiamos el token
        await this.userService.updateUser(user);

        return { message: 'Correo confirmado con éxito' };
    }

    @ApiOperation({ summary: 'Iniciar sesión con credenciales de usuario' })
    @ApiBody({
        description: 'Credenciales de inicio de sesión',
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'usuario@example.com' },
                password: { type: 'string', example: 'contraseña123' },
            },
        },
    })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
        return this.authService.login(loginUserDto);
    }

    @ApiOperation({ summary: 'Solicitud de correo para reinicio de clave' })
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        await this.userService.requestPasswordReset(forgotPasswordDto);
        return { message: 'Correo enviado para recuperar contraseña' };
    }

    @ApiOperation({ summary: 'Reinicio de clave' })
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        await this.userService.resetPassword(resetPasswordDto);
        return { message: 'Contraseña actualizada exitosamente' };
    }
}
