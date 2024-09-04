import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Iniciar sesión con credenciales de usuario' })
  @ApiBody({
    description: 'Credenciales de inicio de sesión',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario@example.com' },
        password: { type: 'string', example: 'contraseña123' },
      },
    },
  })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
