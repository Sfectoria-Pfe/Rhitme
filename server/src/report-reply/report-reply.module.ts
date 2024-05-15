import { Module } from '@nestjs/common';
import { ReportReplyService } from './report-reply.service';
import { ReportReplyController } from './report-reply.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReportReplyService],
  controllers: [ReportReplyController],
})
export class ReportReplyModule {}
