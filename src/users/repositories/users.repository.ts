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
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        organisations: true,
        teams: true,
      },
    });
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany({
      include: {
        organisations: true,
      },
    });
  }

  async createUser(userCreateDto: UserCreateDto) {
    const { username, timezone, firebaseId } = userCreateDto;
    return this.prismaService.user.create({
      data: {
        username,
        timezone,
        firebaseId,
      },
    });
  }
}
