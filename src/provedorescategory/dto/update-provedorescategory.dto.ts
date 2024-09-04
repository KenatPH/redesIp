import { PartialType } from '@nestjs/swagger';
import { CreateProvedorescategoryDto } from './create-provedorescategory.dto';

export class UpdateProvedorescategoryDto extends PartialType(
  CreateProvedorescategoryDto,
) {}
