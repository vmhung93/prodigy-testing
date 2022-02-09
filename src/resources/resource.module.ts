import { Module } from '@nestjs/common';
import { FileUploadModule } from '../shared/file-upload.module';
import { HelperModule } from '../helpers/helper.module';

import { ResourceService } from './resource.service';

import { ResourceController } from './resource.controller';

@Module({
  imports: [FileUploadModule, HelperModule],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
