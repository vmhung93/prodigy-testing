import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '../schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userModel.create(dto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string, includePassword: boolean): Promise<User> {
    if (includePassword) {
      return this.userModel.findOne({ email: email }, '+passwordHash').exec();
    }

    return this.userModel.findOne({ email: email }).exec();
  }

  async updateRoles(id: string, roles: string[]): Promise<any> {
    return this.userModel.updateOne({ _id: id }, { $set: { roles: roles } });
  }
}
