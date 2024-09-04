import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDetailDto } from './create-product-detail.dto';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDetailDto } from './update-product-detail.dto';
import { UpdateProductDto } from './update-product.dto';
import { Productcategory } from 'src/productcategory/entities/productcategory.entity';
import { Proveedor } from 'src/provedores/entities/provedore.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,

    @InjectRepository(Productcategory)
    private readonly categoriaProductoRepository: Repository<Productcategory>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categorias, ...rest } = createProductDto;

    const Productcategory =
      await this.categoriaProductoRepository.findByIds(categorias);

    const provedor = await this.proveedorRepository.findOne({
      where: { id: createProductDto.provedorId },
    });

    const producto = this.productRepository.create({
      ...rest,
      categorias: Productcategory,
    });

    producto.proveedor = provedor;

    return this.productRepository.save(producto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['detalles', 'categorias'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['detalles', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const producto = await this.findOne(id);

    if (updateProductDto.categorias) {
      const Productcategory = await this.categoriaProductoRepository.findByIds(
        updateProductDto.categorias,
      );
      producto.categorias = Productcategory;
    }

    Object.assign(producto, updateProductDto);
    return this.productRepository.save(producto);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async addDetail(
    productId: string,
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    const product = await this.findOne(productId);
    const productDetail = this.productDetailRepository.create({
      ...createProductDetailDto,
      product,
    });
    return this.productDetailRepository.save(productDetail);
  }

  async updateDetail(
    id: string,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    const productDetail = await this.productDetailRepository.preload({
      id,
      ...updateProductDetailDto,
    });
    if (!productDetail) {
      throw new NotFoundException(
        `Detalle del producto con ID ${id} no encontrado`,
      );
    }
    return this.productDetailRepository.save(productDetail);
  }

  async removeDetail(id: string): Promise<void> {
    const productDetail = await this.productDetailRepository.findOne({
      where: { id },
    });
    if (!productDetail) {
      throw new NotFoundException(
        `Detalle del producto con ID ${id} no encontrado`,
      );
    }
    await this.productDetailRepository.remove(productDetail);
  }

  async findByProveedor(proveedorId: string): Promise<Product[]> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id: proveedorId },
    });

    if (!proveedor) {
      throw new NotFoundException(
        `Proveedor con ID ${proveedorId} no encontrado`,
      );
    }

    return this.productRepository.find({
      where: { proveedor: proveedor },
      relations: ['detalles', 'categorias', 'proveedor'],
    });
  }

  async findItemsByProductId(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['itemProductos', 'itemProductos.item'],
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product.itemProductos;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const category = await this.categoriaProductoRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoría con ID ${categoryId} no encontrada`,
      );
    }

    return this.productRepository.find({
      where: {
        categorias: { id: categoryId },
      },
      relations: ['detalles', 'categorias'],
    });
  }
}
