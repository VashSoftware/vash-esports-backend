import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '@vash-backend/users/users.service';
import { UserCreateDto } from '@vash-backend/users/dtos/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post('/create')
  //TODO: implement proper firebase auth
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return this.userService.createUser(userCreateDto);
  }
}
