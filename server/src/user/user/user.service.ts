import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto, UpdateEmployeeDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const {
      department_id,
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      marital_status,
      cin,
      state,
      city,
      street,
      zip,
      country,
      email,
      password,
      job,
      role_id,
      salary,
    } = createEmployeeDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const address = await this.prisma.address.create({
        data: {
          state,
          city,
          street,
          zip,
          country,
        },
      });

      const employee = await this.prisma.employee.create({
        data: {
          department: { connect: { department_id } },
          first_name,
          last_name,
          phone,
          birthday: new Date(birthday),
          gender,
          marital_status,
          cin,
          address: { connect: { address_id: address.address_id } },
          email,
          password: hashedPassword,
          job,
          created_at: new Date(),
          status: 'Out',
          photo:
            'https://res.cloudinary.com/dyiyi2efn/image/upload/v1714245849/nm2wlhiiaxnuwyfkqgin.png',
          role: { connect: { role_id } },
          salary,
          skills: [],
          last_opened: null,
        },
      });

      const year = await this.prisma.year.create({
        data: {
          year: new Date().getFullYear().toString(),
          monthly_absences: Array(12).fill(0),
          monthly_points: Array(12).fill(0),
          employee: { connect: { employee_id: employee.employee_id } },
        },
      });

      const allEmployeesExceptNew = await this.prisma.employee.findMany({
        where: {
          NOT: {
            employee_id: employee.employee_id,
          },
        },
      });

      allEmployeesExceptNew.map(async (emp) => {
        await this.prisma.conversation.create({
          data: {
            name: null,
            participants: {
              connect: [
                { employee_id: employee.employee_id },

                { employee_id: emp.employee_id },
              ],
            },
          },
        });
      });

      return employee;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw { message: 'Email is already in use' };
      } else if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('cin')
      ) {
        throw { message: 'CIN is already in use' };
      } else {
        throw { message: 'Failed to create employee' };
      }
    }
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    const {
      department_id,
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      marital_status,
      cin,
      state,
      city,
      street,
      zip,
      country,
      email,
      job,
      status,
      photo,
      role_id,
      salary,
      skills,
      last_opened,
    } = updateEmployeeDto;

    try {
      const updatedEmployee = await this.prisma.employee.update({
        where: { employee_id: id },
        data: {
          department: { connect: { department_id } },
          first_name,
          last_name,
          phone,
          birthday: new Date(birthday),
          gender,
          marital_status,
          cin,
          address: {
            upsert: {
              create: { state, city, street, zip, country },
              update: { state, city, street, zip, country },
            },
          },
          email,
          job,
          status,
          photo,
          role: { connect: { role_id } },
          salary,
          skills: { set: skills },
          last_opened,
        },
      });

      return updatedEmployee;
    } catch (error) {
      console.error('Failed to update employee:', error.message);
      throw new Error('Failed to update employee');
    }
  }

  async getEmployees(): Promise<Employee[]> {
    try {
      return await this.prisma.employee.findMany({
        include: {
          address: true,
          department: true,
          years: true,
          absences: true,
          conversations: true,
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new Error('Failed to fetch employees');
    }
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { employee_id: id },
        include: {
          address: true,
          department: true,
          years: true,
          absences: true,
        },
      });
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new Error('Failed to fetch employee');
    }
  }

  async deleteEmployee(id: string): Promise<Employee> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { employee_id: id },
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      await this.prisma.departedEmployee.create({
        data: {
          employee_id: employee.employee_id,
          department_id: employee.department_id,
          last_name: employee.last_name,
          first_name: employee.first_name,
          phone: employee.phone,
          birthday: employee.birthday,
          gender: employee.gender,
          cin: employee.cin,
          email: employee.email,
          password: employee.password,
          job: employee.job,
          created_at: employee.created_at,
          photo: employee.photo,
          role_id: employee.role_id,
          marital_status: employee.marital_status,
          skills: employee.skills,
          salary: employee.salary,
          reason: 'hakkeka',
        },
      });

      return await this.prisma.employee.delete({
        where: { employee_id: employee.employee_id },
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateEmployeeStatus(
    employeeId: string,
    status: string,
  ): Promise<Employee | null> {
    try {
      const updatedEmployee = await this.prisma.employee.update({
        where: { employee_id: employeeId },
        data: { status: status },
      });
      return updatedEmployee;
    } catch (error) {
      console.error('Failed to update employee status:', error.message);
      throw new Error('Failed to update employee status');
    }
  }
}
