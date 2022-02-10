import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';

import { Product } from '../schemas/product.schema';

import { Auth } from '../utils/decorators/auth.decorator';
import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

import { Role } from '../common/enums/role.enum';
import { IPaginationOptions } from '../common/interfaces/pagination.interface';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiQuery({ name: 'keyword', type: String, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  async get(@Query() query: IPaginationOptions | any): Promise<any> {
    const paginationOptions: IPaginationOptions = {
      page: parseInt(query.page as any) || 1,
      limit: parseInt(query.limit as any) || 10,
    };

    return await this.productService.get(query.keyword, paginationOptions);
  }

  @Get('most-viewed')
  @Auth(Role.Admin)
  async getMostViewed(): Promise<Product> {
    return await this.productService.getMostViewed();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  async getById(@Param() params): Promise<Product> {
    return await this.productService.getById(params.id);
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
