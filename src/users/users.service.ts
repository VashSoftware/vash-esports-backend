import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@vash-backend/users/repositories/users.repository';
import { UserCreateDto } from '@vash-backend/users/dtos/user-create.dto';
import { userCreateSchema } from '@vash-backend/users/schemas/user-create.schema';
import { formatZodErrors } from '@vash-backend/util/format-zod-errors';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUser(id: number) {
    return this.userRepository.getUserById(id);
  }

  async getUsers() {
        return this.userRepository.getUsers();
    }

  async createUser(userCreateDto: UserCreateDto) {
    const parse = userCreateSchema.safeParse(userCreateDto);
    if (parse.success === true) {
      return this.userRepository.createUser(userCreateDto);
    } else
      throw new BadRequestException(formatZodErrors(parse.error));
  }
}
