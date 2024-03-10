import { Injectable, NotFoundException, UnauthorizedException,Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employees } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(data: Employees): Promise<Employees> {
    data.password = await this.hashPassword(data.password);
    return this.prisma.employees.create({ data });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async updateUser(user_id: string, data: Employees): Promise<Employees> {
    const user = await this.prisma.employees.update({
      where: { user_id },
      data,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return user;
  }

  async removeUser(user_id: string): Promise<Employees> {
    const user = await this.prisma.employees.delete({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return user;
  }
  async getUsersByName(firstName: string, lastName: string): Promise<Employees[]> {
    const users = await this.prisma.employees.findMany({
      where: {
        OR: [
          { first_name: { equals: firstName } },
          { last_name: { equals: lastName } },
        ],
      },
    });
    if (!users || users.length === 0) {
      throw new NotFoundException(`No users found with name ${firstName} ${lastName}`);
    }
    return users;
  }

}
