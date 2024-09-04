import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvedoresService } from './provedores.service';
import { CreateProvedoresDto } from './dto/create-provedores.dto';
import { UpdateProvedoresDto } from './dto/update-provedores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('provedores')
@Controller('provedores')
export class ProvedoresController {
  constructor(private readonly provedoresService: ProvedoresService) {}

  @Post()
  create(@Body() createProvedoreDto: CreateProvedoresDto) {
    return this.provedoresService.create(createProvedoreDto);
  }

  @Get()
  findAll() {
    return this.provedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvedoreDto: UpdateProvedoresDto,
  ) {
    return this.provedoresService.update(id, updateProvedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provedoresService.remove(id);
  }
}
