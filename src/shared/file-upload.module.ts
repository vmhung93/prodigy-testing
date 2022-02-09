import * as fs from 'fs';
import { extname, join } from 'path';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { MIMETypes } from '../common/constants/mime-type.constants';
import { resourceConstants } from '../common/constants/resource.constants';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, callback) => {
          let destination = resourceConstants.assets;

          switch (file.mimetype) {
            case MIMETypes.JPEG:
            case MIMETypes.PNG:
            case MIMETypes.SVG:
              destination = join(destination, 'images');
              break;

            default:
              break;
          }

          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }

          callback(null, destination);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);

          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  ],
  exports: [MulterModule],
})
export class FileUploadModule {}
