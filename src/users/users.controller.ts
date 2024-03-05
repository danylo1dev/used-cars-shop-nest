import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseToSerializable } from 'src/decorators/ResponseToSerializable';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async singUp(@Body() input: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.findUnique({
      email: input.email.toLowerCase(),
    });
    if (user) {
      throw new BadRequestException(
        `User with email ${input.email} alredy exist`,
      );
    }
    return new User(
      await this.usersService.create({
        ...input,
        email: input.email.toLowerCase(),
      }),
    );
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
    const user = await this.usersService.findOneById(+id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }
  @Patch('/:id')
  @ResponseToSerializable(UserDto)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.findOneById(+id);
    const userByEmail =
      body.email &&
      (await this.usersService.findUnique({
        email: body.email.toLowerCase(),
      }));
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    if (userByEmail) {
      throw new BadRequestException(`User with ${user.email} alredy exist`);
    }
    return await this.usersService.update(+id, body);
  }
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOneById(+id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    await this.usersService.remove(+id);
  }
}
