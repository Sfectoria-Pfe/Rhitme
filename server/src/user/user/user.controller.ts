import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from './user.service';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto, UpdateEmployeeDto } from './user.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeeService.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeService.updateEmployee(
      id,
      updateEmployeeDto,
    );
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeeService.deleteEmployee(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }
}
