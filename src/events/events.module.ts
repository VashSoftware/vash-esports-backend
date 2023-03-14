import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { EventsRepository } from '@vash-backend/events/repositories/events.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsModule],
})
export class EventsModule {}
