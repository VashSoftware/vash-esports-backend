import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { TeamCreateDto } from '@vash-backend/teams/dtos/team-create.dto';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTeamById(teamId: number) {
    return await this.prismaService.team.findMany({
      include: {
        members: {
          where: {
            id: teamId,
          },
        },
      },
    });
  }

  async getTeams() {
    return this.prismaService.team.findMany({
      include: {
        members: true,
      },
    });
  }

  async createTeam(userId: number, team: TeamCreateDto) {
    return this.prismaService.team.create({
      data: {
        name: team.teamName,
        members: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });
  }
}
