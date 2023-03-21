import { Injectable } from '@nestjs/common';
import { OrganisationsRepository } from '@vash-backend/organisations/repositories/organisations.repository';
import { Organisation } from '@prisma/client';
import { OrganisationCreateDto } from '@vash-backend/organisations/dtos/organisation-create.dto';

@Injectable()
export class OrganisationsService {
  constructor(
    private readonly organisationsRepository: OrganisationsRepository
  ) {}

  async getAllOrganisations(): Promise<Organisation[]> {
    return await this.organisationsRepository.getAllOrganisations();
  }

  async getOrganisationByUserId(userId: number) {
    return this.organisationsRepository.getOrganisationByUserId(
      userId
    );
  }

  async createOrganisation(
    organisationCreateDto: OrganisationCreateDto
  ) {
    return await this.organisationsRepository.createOrganisation(
      organisationCreateDto
    );
  }
}
