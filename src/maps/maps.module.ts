import { Module } from '@nestjs/common';
import { MapsService } from '@vash-backend/maps/maps.service';
import { MapsController } from '@vash-backend/maps/maps.controller';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { MapsRepository } from '@vash-backend/maps/repositories/maps.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MapsController],
  providers: [MapsService, MapsRepository],
  exports: [MapsModule],
})
export class MapsModule {}
