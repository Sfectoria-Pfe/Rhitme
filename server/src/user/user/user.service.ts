import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employees, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully added',
  })
  async addUser(adduserdto: AddUserDto): Promise<Employees> {
    try {
      adduserdto.password = await this.hashPassword(adduserdto.password);

      const data: Prisma.EmployeesCreateInput = {
        department: {
          connect: {
            department_id: adduserdto.department_id,
          },
        },
        last_name: adduserdto.last_name,
        first_name: adduserdto.first_name,
        phone: adduserdto.phone_number,
        birthday: adduserdto.birthday,
        gender: adduserdto.gender,
        CIN: adduserdto.CIN,
        address: adduserdto.address,
        email: adduserdto.email,
        password: adduserdto.password,
        job: adduserdto.job,
        created_at: new Date(), // Use the current date/time or specify a default value
        points: 0, // Specify a default value
        status: 'out', // Specify a default value
        nb_absence: 0, // Specify a default value
        // photo: adduserdto.photo
      };

      const user = await this.prisma.employees.create({
        data: data,
      });

      return user;
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    return bcrypt.hash(password, saltRounds);
  }

  @ApiOperation({ summary: 'Update a User' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated',
  })
  async updateUser(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Employees> {
    try {
      const user = await this.prisma.employees.update({
        where: { user_id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
      throw error;
    }
  }
  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully removed',
  })
  async removeUser(user_id: string): Promise<Employees> {
    const user = await this.prisma.employees.delete({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return user;
  }
  @ApiOperation({ summary: 'Find a user' })
  @ApiResponse({ status: 201, description: 'User found' })
  async getUserById(id: string): Promise<Employees> {
    const user = await this.prisma.employees.findFirst({
      where: {
        user_id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 201, description: 'all users' })
  async getAllUsers(): Promise<Employees[]> {
    return this.prisma.employees.findMany();
  }
}
