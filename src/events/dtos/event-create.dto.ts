import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QualifierTypeEnum } from '@vash-backend/util/enums/qualifier-type.enum';
import { BracketTypeEnum } from '@vash-backend/util/enums/bracket-type.enum';

export class EventCreateDto {
  @ApiProperty({
    required: true,
    example: 'osu!World Cup 2056',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsOptional()
  osuForumThreadId: number;

  @ApiProperty({
    required: true,
    example: '2056-09-16',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({
    required: true,
    example: 8,
  })
  @IsNumber()
  @IsNotEmpty()
  teamSize: number;

  @ApiProperty({
    required: true,
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  playingTeamSize: number;

  @ApiProperty({
    required: true,
    example: QualifierTypeEnum.QUALIFIERS,
  })
  @IsEnum(QualifierTypeEnum)
  @IsNotEmpty()
  qualifierType: QualifierTypeEnum;

  @ApiProperty({
    required: true,
    example: BracketTypeEnum.DOUBLE_ELIMINATION,
  })
  @IsEnum(BracketTypeEnum)
  @IsNotEmpty()
  bracketType: BracketTypeEnum;

  @ApiProperty({
    required: true,
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  lowerRankLimit: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  upperRankLimit: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  organisationId: number;

  @ApiProperty({
    required: true,
    example: 'challonge',
  })
  @IsString()
  @IsNotEmpty()
  challongeId: string;
}
