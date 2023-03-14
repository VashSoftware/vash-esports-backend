import { BadRequestException, Injectable } from '@nestjs/common';
import { GamesRepository } from './repositories/games.repository';
import { Game } from '@prisma/client';
import { GameCreateDto } from '@vash-backend/games/dtos/game-create.dto';
import { gamesCreateSchema } from '@vash-backend/games/schemas/games.schema';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async getAllGames(): Promise<Game[]> {
    return this.gamesRepository.getAllGames();
  }

  async createGame(gameCreateDto: GameCreateDto): Promise<Game> {
    const parse = gamesCreateSchema.safeParse(gameCreateDto);
    if (parse.success === true) {
      return this.gamesRepository.createGame(gameCreateDto);
    } else throw new BadRequestException(parse.error);
  }
}
