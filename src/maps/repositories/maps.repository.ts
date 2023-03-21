import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { MapCreateDto } from '@vash-backend/maps/dtos/map-create.dto';

@Injectable()
export class MapsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllMaps() {
    return this.prismaService.map.findMany();
  }

  async getMapByBeatmapId(beatmapId: number) {
    return this.prismaService.map.findUnique({
      where: {
        osuBeatmapId: beatmapId,
      },
    });
  }

  async createMap(mapCreateDto: MapCreateDto) {
    return this.prismaService.map.create({
      data: {
        ...mapCreateDto,
      },
    });
  }

  async deleteMap(beatmapId: number) {
    return this.prismaService.map.delete({
      where: {
        osuBeatmapId: beatmapId
      }
    })
  }
}
