import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportReply } from '.prisma/client';

@Injectable()
export class ReportReplyService {
  constructor(private prisma: PrismaService) {}

  async createReportReply(
    reportId: string,
    senderId: string,
    content: string,
  ): Promise<ReportReply> {
    return this.prisma.reportReply.create({
      data: {
        report: { connect: { report_id: reportId } },
        sender: { connect: { employee_id: senderId } },
        content,
      },
    });
  }
}
