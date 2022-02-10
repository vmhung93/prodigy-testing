import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { BaseSchema } from './base.schema';
import { Product } from './product.schema';
import { User } from './user.schema';

export type WishListDocument = WishList & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class WishList extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const WishListSchema = SchemaFactory.createForClass(WishList);
