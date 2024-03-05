import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseToSerializable } from 'src/decorators/ResponseToSerializable';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async singUp(@Body() input: CreateUserDto): Promise<UserDto> {
    return await this.authService.signup({
      ...input,
      email: input.email.toLowerCase(),
    });
  }
  @Get('')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() query: { email: string }): Promise<UserDto[]> {
    return await this.usersService.find(query);
  }
  @Get('/:id')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findOneById(+id);
  }
  @Patch('/:id')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.update(+id, body);
  }
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}
