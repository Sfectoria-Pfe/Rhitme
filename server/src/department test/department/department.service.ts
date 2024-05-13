import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Department } from '@prisma/client';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const { department_name } = createDepartmentDto;
    try {
      return await this.prisma.department.create({
        data: {
          department_name,
        },
      });
    } catch (error) {
      // Handle Prisma errors
      throw new Error(`Failed to create department: ${error.message}`);
    }
  }

  async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department | null> {
    const { department_name, department_head } = updateDepartmentDto;
    try {
      return await this.prisma.department.update({
        where: { department_id: id },
        data: {
          department_name,
          department_head,
        },
      });
    } catch (error) {
      // Handle Prisma errors
      throw new Error('Failed to update department');
    }
  }

  async getDepartments(): Promise<Department[]> {
    try {
      return await this.prisma.department.findMany();
    } catch (error) {
      throw new Error('Failed to fetch departments');
    }
  }

  async getDepartmentById(id: string): Promise<Department | null> {
    try {
      const department = await this.prisma.department.findUnique({
        where: { department_id: id },
      });
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      // Handle Prisma errors or NotFoundException
      throw new Error('Failed to fetch department');
    }
  }
}
