import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Departments } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(departmentName: string): Promise<Departments> {
    return this.prisma.departments.create({
      data: {
        department_name: departmentName,
      },
    });
  }
}
