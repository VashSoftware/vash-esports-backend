import { Injectable } from '@nestjs/common';
import { TeamCreateDto } from './dtos/team-create.dto';
import { TeamsRepository } from './repositories/teams.repository';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async getTeam(id: number) {
    return this.teamsRepository.getTeamById(id);
  }

  async getTeams() {
    return this.teamsRepository.getTeams();
  }

  async createTeam(userId: number, teamCreateDto: TeamCreateDto) {
    return this.teamsRepository.createTeam(userId, teamCreateDto);
  }
}
