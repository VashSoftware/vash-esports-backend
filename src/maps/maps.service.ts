import { BadRequestException, Injectable } from '@nestjs/common';
import { MapsRepository } from '@vash-backend/maps/repositories/maps.repository';
import { MapCreateDto } from '@vash-backend/maps/dtos/map-create.dto';
import { mapCreateSchema } from '@vash-backend/maps/schemas/map-create.schema';
import { formatZodErrors } from '@vash-backend/util/format-zod-errors';

@Injectable()
export class MapsService {
  constructor(private readonly mapsRepository: MapsRepository) {}

  async getAllMaps() {
    return this.mapsRepository.getAllMaps();
  }
  async getMapByBeatmapId(beatmapId: number) {
    return await this.mapsRepository.getMapByBeatmapId(beatmapId);
  }

  async createMap(mapCreateDto: MapCreateDto) {
    const parse = mapCreateSchema.safeParse(mapCreateDto);
    if (parse.success === true) {
      return await this.mapsRepository.createMap(mapCreateDto);
    } else
      throw new BadRequestException(formatZodErrors(parse.error));
  }
}
