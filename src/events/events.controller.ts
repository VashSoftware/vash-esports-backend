import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventCreateDto } from './dtos/event-create.dto';
import { EventTeamIdDto } from '@vash-backend/events/dtos/event-team-id.dto';

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

  @Post('/:eventId/register')
  async registerForEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() eventTeamIdDto: EventTeamIdDto
  ) {
    const { teamId } = eventTeamIdDto;
    return await this.eventsService.registerForEvent(eventId, teamId);
  }

  @Delete('/:eventId/unregister')
  async unregisterFromEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() eventTeamIdDto: EventTeamIdDto
  ) {
    const { teamId } = eventTeamIdDto;
    return await this.eventsService.unregisterFromEvent(
      eventId,
      teamId
    );
  }
}
