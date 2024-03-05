import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(data: CreateUserDto): Promise<UserDto> {
    return this.userService.create(data);
  }
}
