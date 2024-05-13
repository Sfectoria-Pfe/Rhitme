
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [MediaService,CloudinaryService],
  exports: [MediaService],
})
export class MediaModule {}
