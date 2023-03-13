import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventCreateDto } from './dtos/event-create.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  async getAllUnfinishedEvents() {
    return this.eventsService.getAllUnfinishedEvents();
  }

  @Get('/:id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  @Post('/create')
  async createEvent(@Body() eventCreateDto: EventCreateDto) {
    return this.eventsService.createEvent(eventCreateDto);
  }
}
