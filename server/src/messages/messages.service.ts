// messages.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto, UpdateMessageDto } from './messages.dto';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private messagesGateway: MessagesGateway,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: createMessageDto,
    });
    const sender = await this.prisma.employee.findUnique({
      where: { employee_id: createMessageDto.employee_id },
    });
    this.messagesGateway.server.emit('message', { ...message, sender });
    return message;
  }
  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { message_id: id },
      data: updateMessageDto,
    });
  }

  async getByConversation(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversation_id: conversationId },
      include: { sender: true },
    });
  }

  async delete(id: string) {
    return this.prisma.message.delete({
      where: { message_id: id },
    });
  }
}
