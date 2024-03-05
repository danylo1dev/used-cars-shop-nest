import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async singUp(@Body() input: CreateUserDto): Promise<User> {
    return new User(await this.usersService.create(input));
  }
  @Get('')
  @UseInterceptors(new TransformInterceptor<User>(User))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.usersService.find();
  }
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }
}
