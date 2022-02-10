import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MongooseConfig } from './mongoose/mongoose.config';

import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module';
import { ResourceModule } from './resources/resource.module';
import { WishListModule } from './wishlist/wishlist.module';
import { LoggingModule } from './logging/logging.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV === 'production' ? '.production' : ''
      }`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    LoggingModule,
    UserModule,
    AuthModule,
    ProductModule,
    WishListModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
