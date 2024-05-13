import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    taskId: string,
    commentatorId: string,
    content: string,
  ): Promise<Comment> {
    try {
      return this.prisma.comment.create({
        data: {
          task: { connect: { task_id: taskId } },
          commentator: { connect: { employee_id: commentatorId } },
          content,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create comment');
    }
  }
}
