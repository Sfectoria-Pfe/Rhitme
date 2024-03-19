// // // src/user/media.controller.ts
// // import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
// // import { FileInterceptor } from '@nestjs/platform-express';
// // import * as path from 'path';

// // @Controller('media')
// // export class MediaController {
// //   @Post('upload')
// //   @UseInterceptors(FileInterceptor('file'))
// //   async uploadFile(@UploadedFile() file: Express.multer): Promise<string> {
// //     const fileName = `${Date.now()}-${file.originalname}`;
// //     const filePath = path.join(__dirname, '..', 'uploads', fileName); 
    
// //     await file.save(filePath);

// //     return filePath;
// //   }
// }
