import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as multer from 'multer';
import { MediaModule } from 'src/media/media/media.module';
import { MediaService } from 'src/media/media/media.service';
import { CloudinaryService } from 'src/media/media/cloudinary.service';

@Module({
  imports: [
    MediaModule,
    PrismaModule,
    MulterModule.register({
      dest: './uploads/', 
    }),
  ],
  controllers: [UserController],
  providers: [UserService,MediaService,CloudinaryService],
})
export class UserModule {}
