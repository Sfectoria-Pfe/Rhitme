import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subtask } from '@prisma/client';

@Injectable()
export class SubtasksService {
  constructor(private prisma: PrismaService) {}

  async createSubtask(name: string, taskId: string): Promise<Subtask> {
    try {
      return this.prisma.subtask.create({
        data: {
          name,
          task: { connect: { task_id: taskId } },
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create subtask');
    }
  }

  async updateSubtask(subtaskId: string, done: boolean): Promise<Subtask> {
    try {
      return this.prisma.subtask.update({
        where: { subtask_id: subtaskId },
        data: { done },
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update subtask');
    }
  }
}
