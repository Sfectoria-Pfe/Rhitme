import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('project/:projectId')
  async getTasksByProject(@Param('projectId') projectId: string) {
    return this.tasksService.getTasksByProject(projectId);
  }
}
