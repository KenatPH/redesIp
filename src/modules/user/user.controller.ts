import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Muestra todos los usuarios' })
    @Get('show')
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Registrar los usuario' })
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    
    @ApiOperation({ summary: 'Actualizar los usuario' })
    @UseGuards(JwtAuthGuard) 
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id,updateUserDto);
    }
}
