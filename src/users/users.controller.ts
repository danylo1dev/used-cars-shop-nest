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
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseToSerializable } from 'src/decorators/ResponseToSerializable';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';

@Controller('/auth')
@SerializeOptions({ strategy: 'exposeAll' })
@ResponseToSerializable(UserDto)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async singup(
    @Body() input: CreateUserDto,
    @Session() session: any,
  ): Promise<UserDto> {
    const user = await this.authService.signup({
      ...input,
      email: input.email.toLowerCase(),
    });
    session.userId = user.id;
    return user;
  }
  @Post('/login')
  async login(
    @Body() { email, password }: LoginDto,
    @Session() session: any,
  ): Promise<UserDto> {
    const user = await this.authService.singin(email.toLowerCase(), password);
    session.userId = user.id;
    return user;
  }
  @Get('/whoami')
  whoAmI(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
  @Post('/signout')
  singOut(@Session() session: any) {
    session.userId = null;
    return;
  }
  @Get('')
  @UseGuards(SessionAuthGuard)
  async findAll(@Query() query: { email: string }): Promise<UserDto[]> {
    return await this.usersService.find(query);
  }
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findOneById(+id);
  }
  @Patch('/:id')
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
