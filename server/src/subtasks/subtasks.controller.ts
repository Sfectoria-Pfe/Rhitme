import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { Subtask } from '@prisma/client';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  async createSubtask(
    @Body() body: { name: string; taskId: string },
  ): Promise<Subtask> {
    const { name, taskId } = body;
    return this.subtasksService.createSubtask(name, taskId);
  }

  @Put(':subtaskId')
  async updateSubtask(
    @Param('subtaskId') subtaskId: string,
    @Body() body: { done: boolean },
  ): Promise<Subtask> {
    const { done } = body;
    return this.subtasksService.updateSubtask(subtaskId, done);
  }
}
