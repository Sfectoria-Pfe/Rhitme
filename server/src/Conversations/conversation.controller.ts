import { Controller, Get, Param } from '@nestjs/common';
import { ConversationsService } from './conversation.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Get(':employeeId')
  async getConversationsByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.conversationsService.getConversationsByEmployeeId(employeeId);
  }
}
