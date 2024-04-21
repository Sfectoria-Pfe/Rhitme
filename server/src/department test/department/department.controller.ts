import { Controller, Post, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('add')
  async createDepartment(@Body('department_name') departmentName: string) {
    return this.departmentService.createDepartment(departmentName);
  }
}
