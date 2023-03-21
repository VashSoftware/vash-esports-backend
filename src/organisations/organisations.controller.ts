import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganisationsService } from '@vash-backend/organisations/organisations.service';
import { OrganisationCreateDto } from '@vash-backend/organisations/dtos/organisation-create.dto';

@ApiTags('Organisations')
@Controller('organisations')
export class OrganisationsController {
  constructor(
    private readonly organisationsService: OrganisationsService
  ) {}

  @Get()
  async getAllOrganisations() {
    return await this.organisationsService.getAllOrganisations();
  }

  @Get('/:userId')
  async getOrganisationByUserId(
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return await this.organisationsService.getOrganisationByUserId(
      userId
    );
  }

  @Post('/create')
  async createOrganisation(
    @Body() organisationCreateDto: OrganisationCreateDto
  ) {
    return await this.organisationsService.createOrganisation(
      organisationCreateDto
    );
  }
}
