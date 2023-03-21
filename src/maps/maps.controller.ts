import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MapsService } from '@vash-backend/maps/maps.service';
import { MapCreateDto } from '@vash-backend/maps/dtos/map-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('/')
  async getAllMaps() {
    return this.mapsService.getAllMaps();
  }

  @Get('/:beatmapId')
  async getMapByBeatmapId(
    @Param('beatmapId', ParseIntPipe) beatmapId: number
  ) {
    return await this.mapsService.getMapByBeatmapId(beatmapId);
  }

  @Post('/create')
  async createMap(@Body() mapCreateDto: MapCreateDto) {
    return await this.mapsService.createMap(mapCreateDto);
  }
}
