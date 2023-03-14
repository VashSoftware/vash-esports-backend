import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';
import { UserCreateDto } from '@vash-backend/users/dtos/user-create.dto';
@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  /**
   * By default, returns User **without** password.
   *
   * In order to return User **with** password,
   * must specify `{select: { password: true }}`
   */
  async getUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByUsername(username: string) {
    return await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser(userCreateDto: UserCreateDto) {
    const { username, password, timezone } = userCreateDto;
    return await this.prismaService.user.create({
      data: {
        username,
        password,
        timezone,
      },
    });
  }
}
