import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TeamCreateDto } from './dtos/team-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.getTeam(id);
  }

  @Get()
  async getUsers() {
    return this.teamsService.getTeams();
  }

  @Post('/create')
  async createUser(
    @Body() userId: number,
    @Body() teamCreateDto: TeamCreateDto
  ) {
    return this.teamsService.createTeam(userId, teamCreateDto);
  }
}
