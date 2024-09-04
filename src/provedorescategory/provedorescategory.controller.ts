import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvedorescategoryService } from './provedorescategory.service';
import { CreateProvedorescategoryDto } from './dto/create-provedorescategory.dto';
import { UpdateProvedorescategoryDto } from './dto/update-provedorescategory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('provedorescategory')
@Controller('provedorescategory')
export class ProvedorescategoryController {
  constructor(
    private readonly provedorescategoryService: ProvedorescategoryService,
  ) {}

  @Post()
  create(@Body() createProvedorescategoryDto: CreateProvedorescategoryDto) {
    return this.provedorescategoryService.create(createProvedorescategoryDto);
  }

  @Get()
  findAll() {
    return this.provedorescategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provedorescategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvedorescategoryDto: UpdateProvedorescategoryDto,
  ) {
    return this.provedorescategoryService.update(
      id,
      updateProvedorescategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provedorescategoryService.remove(id);
  }
}
