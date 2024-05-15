// messages.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageDto } from './messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get(':conversationId')
  async getByConversation(@Param('conversationId') conversationId: string) {
    return this.messagesService.getByConversation(conversationId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }
}
