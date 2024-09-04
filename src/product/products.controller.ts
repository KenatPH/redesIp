import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductDetailDto } from './create-product-detail.dto';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDetailDto } from './update-product-detail.dto';
import { UpdateProductDto } from './update-product.dto';

@ApiTags('productos')
@Controller('productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Agregar un detalle a un producto' })
  @Post(':productId/detalles')
  addDetail(
    @Param('productId') productId: string,
    @Body() createProductDetailDto: CreateProductDetailDto,
  ) {
    return this.productsService.addDetail(productId, createProductDetailDto);
  }

  @ApiOperation({ summary: 'Actualizar un detalle de producto por ID' })
  @Patch('detalles/:id')
  updateDetail(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return this.productsService.updateDetail(id, updateProductDetailDto);
  }

  @ApiOperation({ summary: 'Eliminar un detalle de producto por ID' })
  @Delete('detalles/:id')
  removeDetail(@Param('id') id: string) {
    return this.productsService.removeDetail(id);
  }

  @ApiOperation({ summary: 'Obtener productos por proveedor' })
  @Get('proveedor/:proveedorId')
  findByProveedor(@Param('proveedorId') proveedorId: string) {
    return this.productsService.findByProveedor(proveedorId);
  }

  @ApiOperation({ summary: 'Obtener items de un producto' })
  @Get('items/:id')
  async getItemsByProductId(@Param('id') id: string) {
    return this.productsService.findItemsByProductId(id);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(categoryId);
  }
}
