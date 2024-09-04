import { PartialType } from '@nestjs/swagger';
import { CreateClientcategoryDto } from './create-clientcategory.dto';

export class UpdateClientcategoryDto extends PartialType(
  CreateClientcategoryDto,
) {}
