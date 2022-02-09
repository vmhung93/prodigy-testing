import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
