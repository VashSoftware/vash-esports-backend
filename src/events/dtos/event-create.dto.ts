import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EventTypeEnum } from 'src/util/enums/event-type.enum';

export class EventCreateDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  organisationId: number;

  @ApiProperty({
    required: true,
    example: EventTypeEnum.TOURNAMENT,
  })
  @IsEnum(EventTypeEnum)
  @IsNotEmpty()
  type: EventTypeEnum;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @ApiProperty({
    required: true,
    example: 'osu!World Cup 2056',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
