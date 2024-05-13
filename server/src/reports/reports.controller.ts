import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './reports.dto';
import { Report } from '@prisma/client';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async createReport(
    @Body() createReportDto: CreateReportDto,
  ): Promise<Report> {
    return this.reportsService.createReport(createReportDto);
  }

  @Get(':id')
  async getReportById(@Param('id') reportId: string): Promise<Report> {
    return this.reportsService.getReportById(reportId);
  }

  @Get()
  async getAllReports(): Promise<Report[]> {
    return this.reportsService.getAllReports();
  }

  @Delete(':id')
  async deleteReport(@Param('id') reportId: string): Promise<void> {
    return this.reportsService.deleteReport(reportId);
  }
}
