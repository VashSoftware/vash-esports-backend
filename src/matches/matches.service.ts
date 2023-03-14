import { Injectable } from '@nestjs/common';
import { MatchesRepository } from '@vash-backend/matches/repositories/matches.repository';
import { MatchCreateDto } from '@vash-backend/matches/dtos/match-create.dto';

@Injectable()
export class MatchesService {
  constructor(
    private readonly matchesRepository: MatchesRepository
  ) {}

  async getMatchById(matchId: number) {
    return await this.matchesRepository.getMatchById(matchId);
  }

  async getAllMatches() {
    return await this.matchesRepository.getAllMatches();
  }

  async createMatch(matchCreateDto: MatchCreateDto) {
    return await this.matchesRepository.createMatch(matchCreateDto);
  }
}
