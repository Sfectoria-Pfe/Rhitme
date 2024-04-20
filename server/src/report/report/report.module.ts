import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ReportService,PrismaClient],
  controllers: [ReportController],
})
export class ReportModule {}
