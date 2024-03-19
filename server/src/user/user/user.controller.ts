// user.controller.ts
import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Employees } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() adduserdto : AddUserDto): Promise<Employees> {
    return this.userService.addUser(adduserdto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Employees> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<Employees> {
    return this.userService.removeUser(id);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Employees> {
    return this.userService.getUserById(id);
  }
  @Get('allusers')
  async getAllUsers(): Promise<Employees[]> {
    return this.userService.getAllUsers();
  }

}
