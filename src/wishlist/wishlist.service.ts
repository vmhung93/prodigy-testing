import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { WishList, WishListDocument } from '../schemas/wish-list.schema';

import { CreateWishListDto } from './dto/create-wish-list.dto';

@Injectable()
export class WishListService {
  constructor(
    @InjectModel(WishList.name) private wishListModel: Model<WishListDocument>,
  ) {}

  async get(userId: string): Promise<WishList[]> {
    return this.wishListModel
      .find({ user: userId })
      .populate({ path: 'product' });
  }

  async create(dto: CreateWishListDto): Promise<WishList> {
    const model = { user: dto.userId, product: dto.productId };

    return this.wishListModel.findOneAndUpdate(model, model, {
      new: true,
      upsert: true,
    });
  }

  async delete(dto: CreateWishListDto): Promise<any> {
    return this.wishListModel.deleteOne({
      user: dto.userId,
      product: dto.productId,
    });
  }
}
