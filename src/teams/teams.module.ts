import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { TeamsRepository } from './repositories/teams.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
