import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateItemProductoDto } from './dto/create-itemproducto.dto';
import { UpdateItemProductoDto } from './dto/update-itemproducto.dto';
import { ItemProductoService } from './itemproducto.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('itemproducto')
@Controller('itemproducto')
export class ItemproductoController {
  constructor(private readonly itemproductoService: ItemProductoService) {}

  @Post()
  create(@Body() createItemproductoDto: CreateItemProductoDto) {
    return this.itemproductoService.create(createItemproductoDto);
  }

  @Get()
  findAll() {
    return this.itemproductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemproductoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemproductoDto: UpdateItemProductoDto,
  ) {
    return this.itemproductoService.update(id, updateItemproductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemproductoService.remove(id);
  }
}
