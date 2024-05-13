import { Controller, Post, Body } from '@nestjs/common';
import { ReportReplyService } from './report-reply.service';

@Controller('report-replies')
export class ReportReplyController {
  constructor(private reportReplyService: ReportReplyService) {}

  @Post()
  async createReportReply(
    @Body() data: { reportId: string; senderId: string; content: string },
  ) {
    return this.reportReplyService.createReportReply(
      data.reportId,
      data.senderId,
      data.content,
    );
  }
}
