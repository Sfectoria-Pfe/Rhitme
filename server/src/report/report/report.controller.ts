// reports.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReportsService } from './report.service';
import { CreateReportDto, UpdateReportDto } from './report.dto';
import { Reports } from '@prisma/client';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll(): Promise<Reports[]> {
    return this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reports> {
    return this.reportsService.findOne(id);
  }

  @Post()
  async create(@Body() createReportDto: CreateReportDto): Promise<Reports> {
    return this.reportsService.create(createReportDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto): Promise<Reports> {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.reportsService.remove(id);
  }
}
