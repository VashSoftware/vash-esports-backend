import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsTimeZone } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    required: true,
    example: 'KirbyTwister',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    example: 'UTC+3',
  })
  @IsTimeZone()
  @IsNotEmpty()
  timezone: string;

  @ApiProperty({
    required: true,
    example: 'SKPOKFPSFMNVIFJR',
  })
  @IsString()
  @IsNotEmpty()
  firebaseId: string;
}
