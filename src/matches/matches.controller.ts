import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MatchesService } from '@vash-backend/matches/matches.service';
import { MatchCreateDto } from '@vash-backend/matches/dtos/match-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('/:id')
  async getMatchById(@Param('id', ParseIntPipe) id: number) {
    return await this.matchesService.getMatchById(id);
  }

  @Get()
  async getAllMatches() {
    return await this.matchesService.getAllMatches();
  }

  @Post('/create')
  async createMatch(@Body() matchCreateDto: MatchCreateDto) {
    return await this.matchesService.createMatch(matchCreateDto);
  }
}
