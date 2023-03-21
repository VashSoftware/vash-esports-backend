import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EventTeamIdDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teamId: number;
}
