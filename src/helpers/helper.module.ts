import { Module } from '@nestjs/common';

import { StringHelper } from './string.helper';

@Module({
  providers: [StringHelper],
  exports: [StringHelper],
})
export class HelperModule {}
