import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WishList, WishListSchema } from '../schemas/wish-list.schema';

import { WishListService } from './wishlist.service';

import { WishListController } from './wishlist.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WishList.name, schema: WishListSchema },
    ]),
  ],
  controllers: [WishListController],
  providers: [WishListService],
  exports: [WishListService],
})
export class WishListModule {}
