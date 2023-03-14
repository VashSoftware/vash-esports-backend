import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from '@vash-backend/games/games.service';
import { GameCreateDto } from '@vash-backend/games/dtos/game-create.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('/')
  async getAllGames() {
    return this.gamesService.getAllGames();
  }

  @Post('/create')
  async createGame(@Body() gameCreateDto: GameCreateDto) {
    return this.gamesService.createGame(gameCreateDto);
  }
}
