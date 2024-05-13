import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Department } from '@prisma/client';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    try {
      return await this.departmentService.createDepartment(createDepartmentDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Put(':id')
  async updateDepartment(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    try {
      const department = await this.departmentService.updateDepartment(
        id,
        updateDepartmentDto,
      );
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  async getDepartments(): Promise<Department[]> {
    try {
      return await this.departmentService.getDepartments();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<Department> {
    try {
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
