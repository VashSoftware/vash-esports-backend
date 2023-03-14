import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    PrismaModule,
    EventsModule,
    GamesModule,
    UsersModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
