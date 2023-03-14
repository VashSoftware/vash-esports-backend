import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { OrganisationsModule } from './organisations/organisations.module';

@Module({
  imports: [
    PrismaModule,
    EventsModule,
    GamesModule,
    UsersModule,
    MatchesModule,
    OrganisationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
