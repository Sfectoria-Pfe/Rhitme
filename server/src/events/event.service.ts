import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Events, EventParticipants } from '.prisma/client';
import { CreateEventDto, UpdateEventDto } from './event.dto'

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(eventData: CreateEventDto): Promise<Events> {
    const event = await this.prisma.events.create({
      data: eventData,
      include: {
        event: true,
      },
    });
    await this.prisma.notes.create({
      data: {
        Description: `Event Created`,
      },
    });
    return event;
  }
  

  async deleteEvent(eventId: string): Promise<void> {
    await this.prisma.events.delete({
      where: {
        event_id: eventId,
      },
    });
    await this.prisma.notes.create({
      data: {
        Description: `Event deleted`,
      },
    });
  }

  async updateEvent(eventId: string, eventData: UpdateEventDto): Promise<Events> {
    const event = await this.prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: eventData,
      include: {
        event: true,
      },
    });
    await this.prisma.notes.create({
      data: {
        Description: `Event Updated`,
      },
    });
    return event;
  }

  async participateInEvent(userId: string, eventId: string): Promise<EventParticipants> {
    const participant = await this.prisma.eventParticipants.create({
      data: {
        user: {
          connect: {
            user_id: userId,
          },
        },
        event: {
          connect: {
            event_id: eventId,
          },
        },
      },
      include: {
        event: true,
        user: true,
      },
    });
    return participant;
  }

  async getAllEvents(): Promise<Events[]> {
    const events = await this.prisma.events.findMany({
      include: {
        event: true,
      },
    });
    return events;
  }

  async getEventById(eventId: string): Promise<Events> {
    const event = await this.prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
      include: {
        event: true,
      },
    });
    return event;
  }

  async getEventParticipants(eventId: string): Promise<EventParticipants[]> {
    const participants = await this.prisma.eventParticipants.findMany({
      where: {
        event_id: eventId,
      },
      include: {
        event: true,
        user: true,
      },
    });
    return participants;
  }
}