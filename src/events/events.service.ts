import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from './repositories/events.repository';
import { EventCreateDto } from './dtos/event-create.dto';
import { eventsCreateSchema } from './schemas/events-create.schema';

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
}
