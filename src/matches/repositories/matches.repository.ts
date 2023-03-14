import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { MatchCreateDto } from '@vash-backend/matches/dtos/match-create.dto';

@Injectable()
export class MatchesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllMatches() {
    return await this.prismaService.match.findMany({
      include: {
        teams: true,
      },
    });
  }

  async getMatchById(matchId: number) {
    return await this.prismaService.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        teams: true,
        rounds: true,
        scores: true,
      },
    });
  }

  async createMatch(matchCreateDto: MatchCreateDto) {
    const { roundId, eventId } = matchCreateDto;
    return await this.prismaService.match.create({
      data: {
        eventId,
        rounds: {
          connect: {
            id: roundId,
          },
        },
      },
    });
  }
}
