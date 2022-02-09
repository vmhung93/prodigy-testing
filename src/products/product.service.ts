import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from '../schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getMostViewed(): Promise<Product> {
    return this.productModel.findOne({}, {}, { sort: { viewed: -1 } });
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  async update(dto: UpdateProductDto): Promise<any> {
    return this.productModel.updateOne(
      { _id: dto.id },
      {
        $set: {
          title: dto.title,
          description: dto.description,
          brand: dto.brand,
          type: dto.type,
          price: dto.price,
          discount: dto.discount,
          images: dto.images,
        },
      },
    );
  }

  async increaseView(id: string): Promise<any> {
    return this.productModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          viewed: 1,
        },
      },
      { returnDocument: 'after' },
    );
  }
}
