import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';
import { OrganisationsRepository } from '@vash-backend/organisations/repositories/organisations.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrganisationsController],
  providers: [OrganisationsService, OrganisationsRepository],
  exports: [OrganisationsModule],
})
export class OrganisationsModule {}
