import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {}
