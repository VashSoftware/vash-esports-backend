import {
  INestApplication,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  private enableLogging() {
    this.$on('query', (event) => {
      console.log(`------Query started------`);
      console.log({
        Query: event.query,
        Params: event.params,
        Duration: `${event.duration} ms`,
      });
      console.log(`------Query ended------\n`);
    });
  }
}
