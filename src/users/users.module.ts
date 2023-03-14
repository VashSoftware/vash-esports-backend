import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '@vash-backend/users/users.controller';
import { UsersRepository } from '@vash-backend/users/repositories/users.repository';
import { PrismaModule } from '@vash-backend/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersModule],
})
export class UsersModule {}
