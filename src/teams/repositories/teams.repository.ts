import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { TeamCreateDto } from '@vash-backend/teams/dtos/team-create.dto';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTeamByUserId(userId: number) {
    return await this.prismaService.team.findFirst({
      include: {
        members: {
          where: {
            id: userId,
          },
        },
      },
    });
  }

  async createTeam(userId: number, teamName: string) {
    return this.prismaService.team.create({
      data: {
        name: teamName,
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
