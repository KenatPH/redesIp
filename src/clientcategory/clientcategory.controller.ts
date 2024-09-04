import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientcategoryService } from './clientcategory.service';
import { CreateClientcategoryDto } from './dto/create-clientcategory.dto';
import { UpdateClientcategoryDto } from './dto/update-clientcategory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clientcategory')
@Controller('clientcategory')
export class ClientcategoryController {
  constructor(private readonly clientcategoryService: ClientcategoryService) {}

  @Post()
  create(@Body() createClientcategoryDto: CreateClientcategoryDto) {
    return this.clientcategoryService.create(createClientcategoryDto);
  }

  @Get()
  findAll() {
    return this.clientcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientcategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientcategoryDto: UpdateClientcategoryDto,
  ) {
    return this.clientcategoryService.update(id, updateClientcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientcategoryService.remove(id);
  }
}
