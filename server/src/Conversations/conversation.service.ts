import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async getConversationsByEmployeeId(employeeId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            employee_id: employeeId,
          },
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }
}
