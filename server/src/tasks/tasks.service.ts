import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { Task } from '@prisma/client';
import { Comment } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const {
        project_id,
        employee_id,
        title,
        description,
        start,
        end,
        points,
        status,
        manager_approved,
        done_date,
      } = createTaskDto;

      return this.prisma.task.create({
        data: {
          project: { connect: { project_id } },
          employee: { connect: { employee_id } },
          title,
          description,
          start: new Date(start),
          end: new Date(end),
          points,
          status,
          manager_approved,
          done_date: done_date ? new Date(done_date) : null,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const {
      title,
      description,
      start,
      end,
      points,
      status,
      manager_approved,
      done_date,
      employee_id
    } = updateTaskDto;

    return this.prisma.task.update({
      where: { task_id: id },
      data: {
        title,
        description,
        employee_id,
        start: new Date(start),
        end: new Date(end),
        points,
        status,
        manager_approved,
        done_date: done_date ? new Date(done_date) : null,
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { task_id: id },
    });
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { project_id: projectId },
      include: {
        project: true,
        employee: true,
        subtasks: true,
        comments: true,
      },
    });
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { task_id: taskId },
      include: {
        project: true,
        employee: true,
        subtasks: true,
        comments: true,
      },
    });
  }
}
