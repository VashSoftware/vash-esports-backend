import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { GameCreateDto } from '@vash-backend/games/dtos/game-create.dto';

export class GamesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllGames() {
    return this.prismaService.game.findMany();
  }

  async createGame(gameCreateDto: GameCreateDto) {
    const { name } = gameCreateDto;
    return this.prismaService.game.create({
      data: {
        name,
      },
    });
  }
}
