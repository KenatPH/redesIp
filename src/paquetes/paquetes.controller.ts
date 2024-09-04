import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';
import { PaqueteService } from './paquetes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('paquetes')
@Controller('paquetes')
export class PaqueteController {
  constructor(private readonly paqueteService: PaqueteService) {}

  @Post()
  create(@Body() createPaqueteDto: CreatePaqueteDto) {
    return this.paqueteService.create(createPaqueteDto);
  }

  @Get()
  findAll() {
    return this.paqueteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paqueteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaqueteDto: UpdatePaqueteDto) {
    return this.paqueteService.update(id, updatePaqueteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paqueteService.remove(id);
  }
}
