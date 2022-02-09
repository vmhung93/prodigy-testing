import { join } from 'path';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';

import { resourceConstants } from '../common/constants/resource.constants';

import { StringHelper } from '../helpers/string.helper';

import { ResourceDto } from './dto/resource.dto';

import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

@ApiTags('Resource')
@Controller('resources')
export class ResourceController {
  constructor(
    private configService: ConfigService,
    private stringHelper: StringHelper,
  ) {}

  @AllowAnonymous()
  @Post('images')
  @UseInterceptors(FilesInterceptor('images'))
  uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): ResourceDto[] {
    const images = [];
    const baseURL = this.configService.get<string>('BASE_URL');

    files.forEach((file) => {
      const { filename, mimetype, path } = file;

      const dto = new ResourceDto();
      dto.fileName = filename;
      dto.mimeType = mimetype;
      dto.path = path;
      dto.url = `${baseURL}${this.stringHelper.normalizePath(
        path.replace(resourceConstants.assets, ''),
      )}`;

      images.push(dto);
    });

    return images;
  }

  @Get('images/:imageId')
  async images(@Param('imageId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: join(resourceConstants.assets, 'images') });
  }
}
