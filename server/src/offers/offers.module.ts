import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
