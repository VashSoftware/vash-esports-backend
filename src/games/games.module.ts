import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { GamesRepository } from '@vash-backend/games/repositories/games.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesModule],
})
export class GamesModule {}
