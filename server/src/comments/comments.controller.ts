import { Controller, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Body() body: { taskId: string; commentatorId: string; content: string },
  ): Promise<Comment> {
    const { taskId, commentatorId, content } = body;
    return this.commentsService.createComment(taskId, commentatorId, content);
  }
}
