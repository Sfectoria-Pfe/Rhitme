import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from '@prisma/client';
import { CreateReportDto, UpdateReportDto } from './report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Reports>,
  ) {}

  async findAll(): Promise<Reports[]> {
    return this.reportRepository.find();
  }

  async findOne(id: string): Promise<Reports> {
    return this.reportRepository.findOne({ report_id: id } as any);
  }

  async create(createReportDto: CreateReportDto): Promise<Reports> {
    const report = this.reportRepository.create(createReportDto);
    return this.reportRepository.save(report);
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Reports> {
    const report = await this.reportRepository.findOne({ report_id: id } as any);
    if (!report) {
      throw new Error('Report not found');
    }
    const updatedReport = { ...report, ...updateReportDto };
    return this.reportRepository.save(updatedReport);
  }

  async remove(id: string): Promise<void> {
    await this.reportRepository.delete(id);
  }
}