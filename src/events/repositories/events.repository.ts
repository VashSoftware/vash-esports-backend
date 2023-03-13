import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventCreateDto } from '../dtos/event-create.dto';

@Injectable()
export class EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUnfinishedEvents() {
    return this.prismaService.event.findMany({
      where: {
        isFinished: false,
      },
    });
  }

  async getEventById(id: number) {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
      include: {
        organisation: true,
        game: true,
        participants: true,
        matches: true,
      },
    });
  }

  async createEvent(eventDto: EventCreateDto) {
    return this.prismaService.event.create({
      data: {
        ...eventDto,
      },
    });
  }
}
