import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {}
