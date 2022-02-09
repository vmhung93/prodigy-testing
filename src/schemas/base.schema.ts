import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  id: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
