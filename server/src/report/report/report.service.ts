import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, Reports } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { CreateReportDto, UpdateReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Reports[]> {
    return this.prisma.reports.findMany();
  }

  async findOne(id: string): Promise<Reports | null> {
    return this.prisma.reports.findUnique({ where: { report_id: id } });
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded: any = jwt.verify(token, '7XKEMX3YN4E4H');
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async create(createReportDto: CreateReportDto, token: string): Promise<Reports> {
    const decodedToken = await this.decodeToken(token);
    const currentDate = new Date();
    await this.prisma.notes.create({
      data: {
        Description: `Report sent`,
      },
    });
   return this.prisma.reports.create({
      data: { 
        user_id: decodedToken.user_id,
        created_at: currentDate,
        title: createReportDto.title,
        description: createReportDto.description,
        type: createReportDto.type,
        receiver: createReportDto.receiver,
      }
    });

  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Reports | null> {
    await this.prisma.notes.create({
      data: {
        Description: `Report Updated`,
      },
    });
    return this.prisma.reports.update({
      where: { report_id: id },
      data: updateReportDto,
    });
  }

  async remove(id: string): Promise<Reports | null> {
    await this.prisma.notes.create({
      data: {
        Description: `Report Deleted`,
      },
    });
    return this.prisma.reports.delete({ where: { report_id: id } });
  }
}
