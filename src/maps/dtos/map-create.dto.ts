import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MapCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  osuBeatmapId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  mapper: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  cover: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  ar: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  cs: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  od: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  hp: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  bpm: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  length: string;
}
