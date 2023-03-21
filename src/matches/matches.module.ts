import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchesRepository } from '@vash-backend/matches/repositories/matches.repository';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MatchesService, MatchesRepository],
  controllers: [MatchesController],
  exports: [MatchesModule],
})
export class MatchesModule {}
