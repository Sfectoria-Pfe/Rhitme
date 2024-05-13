import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './reports.dto';
import { Report } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    try {
      const { employeeId, title, description, receiverId } = createReportDto;

      const report = await this.prisma.report.create({
        data: {
          sender: { connect: { employee_id: employeeId } },
          title,
          description,
          receiver: receiverId
            ? { connect: { employee_id: receiverId } }
            : undefined,
        },
      });
      return report;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create report');
    }
  }

  async getReportById(reportId: string): Promise<Report> {
    try {
      const report = await this.prisma.report.findUnique({
        where: { report_id: reportId },
        include: {
          sender: true,
          replies: {
            include: { sender: true },
            orderBy: { created_at: 'desc' },
          },
          receiver: true,
        },
      });
      if (!report) {
        throw new NotFoundException('Report not found');
      }
      return report;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get report');
    }
  }

  async getAllReports(): Promise<Report[]> {
    try {
      return await this.prisma.report.findMany({
        include: { sender: true, replies: true, receiver: true },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get reports');
    }
  }

  async deleteReport(reportId: string): Promise<void> {
    try {
      await this.prisma.report.delete({ where: { report_id: reportId } });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete report');
    }
  }
}
