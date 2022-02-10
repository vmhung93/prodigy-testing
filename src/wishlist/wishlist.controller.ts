import { Request, Controller, Param, Post, Get, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { WishList } from '../schemas/wish-list.schema';

import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

import { CreateWishListDto } from './dto/create-wish-list.dto';

import { WishListService } from './wishlist.service';

@ApiTags('Wish List')
@ApiBearerAuth()
@Controller('wishlist')
export class WishListController {
  constructor(private wishListService: WishListService) {}

  @Get()
  async get(@Request() req): Promise<WishList[]> {
    return await this.wishListService.get(req.user.id);
  }

  @Get('most-listed')
  @AllowAnonymous()
  async getMostListed(): Promise<WishList> {
    return await this.wishListService.getMostListed();
  }

  @Post(':productId')
  @ApiParam({ name: 'productId', type: String })
  async create(@Param() params, @Request() req): Promise<WishList> {
    const dto: CreateWishListDto = {
      productId: params.productId,
      userId: req.user.id,
    };

    return await this.wishListService.create(dto);
  }

  @Delete(':productId')
  @ApiParam({ name: 'productId', type: String })
  async delete(@Param() params, @Request() req): Promise<WishList> {
    const dto: CreateWishListDto = {
      productId: params.productId,
      userId: req.user.id,
    };

    return await this.wishListService.delete(dto);
  }
}
