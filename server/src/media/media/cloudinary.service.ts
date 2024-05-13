import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    return result.url;
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const result = await cloudinary.uploader.upload(file.path);

    // You can add more options or transformations here if needed

    return { url: result.url };
  }
}


