// reports.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportDto } from './report.dto';
import { Reports } from '@prisma/client';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportService) {}

  @Get()
  async findAll(): Promise<Reports[]> {
    return this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reports> {
    return this.reportsService.findOne(id);
  }

  @Post('addreport')
  async create(@Body() createReportDto: CreateReportDto , token:string): Promise<Reports> {
    return this.reportsService.create(createReportDto,token);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto): Promise<Reports> {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Reports> {
    return this.reportsService.remove(id);
  }
}
