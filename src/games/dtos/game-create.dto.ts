import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GameCreateDto {
  @ApiProperty({
    required: true,
    example: 'osu!',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
