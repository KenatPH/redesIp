import { PartialType } from '@nestjs/swagger';
import { CreateProductcategoryDto } from './create-productcategory.dto';

export class UpdateProductcategoryDto extends PartialType(
  CreateProductcategoryDto,
) {}
