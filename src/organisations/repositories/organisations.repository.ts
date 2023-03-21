import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { OrganisationCreateDto } from '@vash-backend/organisations/dtos/organisation-create.dto';
import { Organisation } from '@prisma/client';

@Injectable()
export class OrganisationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrganisations(): Promise<Organisation[]> {
    return this.prismaService.organisation.findMany({
      include: {
        members: true,
        events: true,
      },
    });
  }

  async getOrganisationByUserId(userId: number) {
    return this.prismaService.organisation.findMany({
      include: {
        members: {
          where: {
            id: userId,
          },
        },
      },
    });
  }

  async createOrganisation(
    organisationCreateDto: OrganisationCreateDto
  ) {
    const { name, userId } = organisationCreateDto;
    return this.prismaService.organisation.create({
      data: {
        name,
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
