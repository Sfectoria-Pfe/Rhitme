import { Module,Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService], // Corrected to export PrismaService
})
export class PrismaModule {}
