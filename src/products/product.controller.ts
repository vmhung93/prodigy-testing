import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';

import { Product } from '../schemas/product.schema';

import { Auth } from '../utils/decorators/auth.decorator';
import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

import { Role } from '../common/enums/role.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('most-viewed')
  @Auth(Role.Admin)
  async getMostViewed(): Promise<Product> {
    return await this.productService.getMostViewed();
  }

  @Post()
  @Auth(Role.Admin)
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.create(dto);
  }

  @Put()
  @Auth(Role.Admin)
  async update(@Body() dto: UpdateProductDto): Promise<any> {
    return await this.productService.update(dto);
  }

  @Put('view/:id')
  @AllowAnonymous()
  async inscreaseView(@Param('id') id: string): Promise<any> {
    return await this.productService.increaseView(id);
  }
}
