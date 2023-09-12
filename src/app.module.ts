import { Module } from '@nestjs/common';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { EventsModule } from '@vash-backend/events/events.module';
import { GamesModule } from '@vash-backend/games/games.module';
import { UsersModule } from '@vash-backend/users/users.module';
import { MatchesModule } from '@vash-backend/matches/matches.module';
import { OrganisationsModule } from '@vash-backend/organisations/organisations.module';
import { TeamsModule } from '@vash-backend/teams/teams.module';
import { RatingsModule } from '@vash-backend/ratings/ratings.module';
import { MapsModule } from '@vash-backend/maps/maps.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    PrismaModule,
    EventsModule,
    GamesModule,
    UsersModule,
    MatchesModule,
    OrganisationsModule,
    TeamsModule,
    RatingsModule,
    MapsModule,
  ],
})
export class AppModule {}
