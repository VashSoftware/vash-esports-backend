import {
  INestApplication,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { isNil } from '@nestjs/common/utils/shared.utils';

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
    await this.hashPasswords();
    await this.hidePasswordsByDefault();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private hashPasswords() {
    this.$use(async (params, next) => {
      if (
        params.model === 'User' &&
        params.action === 'create' &&
        params.args.data.password
      ) {
        params.args.data.password = hashSync(
          params.args.data.password,
          12
        );
      }

      return next(params);
    });
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

  private hidePasswordsByDefault() {
    const userActions = [
      'findFirst',
      'findMany',
      'findUnique',
      'create',
    ];
    this.$use(async (params, next) => {
      const result = await next(params);
      if (
        params.model === 'User' &&
        userActions.some((action) => action === params.action) &&
        this.isSelectPasswordNotTrue(params.args)
      ) {
        delete result.password;
      }
      return result;
    });
  }

  private isSelectPasswordNotTrue(args: any) {
    return (
      isNil(args.select) ||
      (!isNil(args.select) &&
        !isNil(args.select.password) &&
        !args.select.password)
    );
  }
}
