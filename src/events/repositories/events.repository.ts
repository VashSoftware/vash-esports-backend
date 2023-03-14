import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventCreateDto } from '../dtos/event-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

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

  async registerForEvent(eventId: number, teamId: number) {
    const eventParticipant = await this.findTeamEntryForEvent(
      eventId,
      teamId
    );
    if (!isNil(eventParticipant)) {
      throw new BadRequestException(
        'Team is already registered for this event'
      );
    }

    return this.prismaService.event.update({
      where: {
        id: eventId,
      },
      include: {
        participants: true,
      },
      data: {
        participants: {
          connect: {
            id: teamId,
          },
        },
      },
    });
  }

  async unregisterFromEvent(eventId: number, teamId: number) {
    return await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      include: {
        participants: true,
      },
      data: {
        participants: {
          disconnect: {
            id: teamId,
          },
        },
      },
    });
  }

  async findTeamEntryForEvent(
    eventId: number,
    teamId: number
  ) {
    return await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        participants: {
          where: {
            id: teamId,
          },
        },
      },
    });
  }
}
