import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComisionProductoService } from './comisionproducto.service';
import { CreateComisionProductoDto } from './dto/create-comisionproducto.dto';
import { ApiTags } from '@nestjs/swagger';
import { ComisionProducto } from './entities/comisionproducto.entity';

@ApiTags('comisionproducto')
@Controller('comisionproducto')
export class ComisionproductoController {
  constructor(
    private readonly comisionproductoService: ComisionProductoService,
  ) {}

  @Post()
  create(@Body() createComisionproductoDto: CreateComisionProductoDto) {
    return this.comisionproductoService.create(createComisionproductoDto);
  }

  @Get()
  findAll() {
    return this.comisionproductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comisionproductoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComisionproductoDto: CreateComisionProductoDto,
  ) {
    return this.comisionproductoService.update(id, updateComisionproductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionproductoService.remove(id);
  }

  @Get('product/:productId')
  async getComisionesByProductId(
    @Param('productId') productId: string,
  ): Promise<ComisionProducto[]> {
    return this.comisionproductoService.findByProductId(productId);
  }
}
