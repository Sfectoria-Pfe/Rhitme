import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService
import { Media } from '@prisma/client'; // Import Media type

@Injectable()
export class MediaService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private prisma: PrismaService, // Inject PrismaService here
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.cloudinaryService.uploadFile(file);

    if (!result) {
      throw new BadRequestException('Error uploading file');
    }

    return result.url;
  }

  async createMedia(url: string): Promise<Media> {
    return this.prisma.media.create({
      data: {
        url,
      },
    });
  }
}
