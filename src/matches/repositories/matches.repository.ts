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
    });
  }

  async createMatch(matchCreateDto: MatchCreateDto) {
    const { roundId } = matchCreateDto;
    return await this.prismaService.match.create({
      data: {
        rounds: {
          connect: {
            id: roundId,
          },
        },
      },
    });
  }
}
