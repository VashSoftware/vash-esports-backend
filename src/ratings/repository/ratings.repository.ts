import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vash-backend/prisma/prisma.service';

@Injectable()
export class RatingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getRatingsByUserId(userId: number) {
    return await this.prismaService.rating.findMany({
      where: {
        userId,
      },
      include: {
        game: true,
      },
    });
  }
}
