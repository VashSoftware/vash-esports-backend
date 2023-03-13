import { Module }        from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { AppService }    from './app.service';

@Module({
  imports: [PrismaService, PrismaModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
