import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { MediaModule } from './media/media/media.module';

@Module({
  imports: [PrismaModule,UserModule,AuthModule,MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
