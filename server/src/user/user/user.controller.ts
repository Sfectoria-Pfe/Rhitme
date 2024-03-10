// user.controller.ts
import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Employees } from '@prisma/client';
import { AddUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() data : AddUserDto): Promise<Employees> {
    return this.userService.addUser(data.data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: Employees): Promise<Employees> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<Employees> {
    return this.userService.removeUser(id);
  }
  @Get(':firstName/:lastName')
  async getUsersByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string): Promise<Employees[]> {
    return this.userService.getUsersByName(firstName, lastName);
  }

}
