import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseSchema } from './base.schema';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  type: string;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop([String])
  images: string[];

  @Prop({ default: 0 })
  viewed: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
