import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from './repositories/events.repository';
import { EventCreateDto } from './dtos/event-create.dto';
import { eventsCreateSchema } from './schemas/events-create.schema';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEventById(id: number) {
    return this.eventsRepository.getEventById(id);
  }

  async getAllUnfinishedEvents() {
    return this.eventsRepository.getAllUnfinishedEvents();
  }

  async createEvent(eventDto: EventCreateDto) {
    const parse = eventsCreateSchema.safeParse(eventDto);

    if (parse.success === true) {
      return this.eventsRepository.createEvent(eventDto);
    } else throw new BadRequestException(parse.error);
  }

  async registerForEvent(eventId: number, teamId: number) {
    const registeredTeam =
      await this.eventsRepository.findTeamEntryForEvent(
        eventId,
        teamId
      );
    if (!isNil(registeredTeam)) {
      throw new BadRequestException(
        'Team is not registered for this event'
      );
    }
    return await this.eventsRepository.registerForEvent(
      eventId,
      teamId
    );
  }

  async unregisterFromEvent(eventId: number, teamId: number) {
    const registeredTeam =
      await this.eventsRepository.findTeamEntryForEvent(
        eventId,
        teamId
      );
    if (isNil(registeredTeam)) {
      throw new BadRequestException(
        'Team is not registered for this event'
      );
    }
    return await this.eventsRepository.unregisterFromEvent(
      eventId,
      registeredTeam.id
    );
  }
}
