import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('addevent')
  createEvent(@Body() eventData: CreateEventDto) {
    return this.eventService.createEvent(eventData);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() eventData: UpdateEventDto) {
    return this.eventService.updateEvent(id, eventData);
  }

  @Post(':eventId/participants/:userId')
  participateInEvent(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.eventService.participateInEvent(userId, eventId);
  }

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Get(':id/participants')
  getEventParticipants(@Param('id') id: string) {
    return this.eventService.getEventParticipants(id);
  }
}
