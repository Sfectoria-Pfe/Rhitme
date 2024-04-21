import { Controller, Post, Body, Param, Put, Delete, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { Employees } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from './user.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import * as path from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() addUserDto: AddUserDto): Promise<Employees> {
    // const user = await this.userService.addUser(addUserDto, profilePicture);
    const user = await this.userService.addUser(addUserDto);
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Employees> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<Employees> {
    return this.userService.removeUser(id);
  }

  @Get('employee/:id')
  async getUserById(@Param('id') id: string): Promise<Employees> {
    return this.userService.getUserById(id);
  }

  @Get('allusers')
  async getAllUsers(): Promise<Employees[]> {
    return this.userService.getAllUsers();
  }
}
