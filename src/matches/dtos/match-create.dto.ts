import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MatchCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  roundId: number;
}
