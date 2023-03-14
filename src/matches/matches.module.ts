import { Module }            from '@nestjs/common';
import { MatchesService }    from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchesRepository } from '@vash-backend/matches/repositories/matches.repository';

@Module({
  providers: [MatchesService, MatchesRepository],
  controllers: [MatchesController],
  exports: [MatchesModule]
})
export class MatchesModule {}
