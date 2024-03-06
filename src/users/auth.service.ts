import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  private geterateSalt(): string {
    return randomBytes(8).toString('hex');
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = this.geterateSalt();
    const result = await this.hash(password, salt);
    return result;
  }
  private async hash(password: string, salt: string): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }
  private async compare(password, hashedPassword): Promise<boolean> {
    const [salt, storedHash] = hashedPassword.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return storedHash !== hash.toString('hex');
  }
  async signup(data: CreateUserDto): Promise<UserDto> {
    const existUsersWithEmail = await this.userService.find({
      email: data.email,
    });
    if (existUsersWithEmail.length) {
      throw new BadRequestException('email is used');
    }
    const hashedPassword = await this.hashPassword(data.password);
    const user = new User({
      email: data.email,
      password: hashedPassword,
    });
    return this.userService.create(user);
  }
  async singin(email: string, password: string) {
    const user = await this.userService.findUniqueOrDotThrow({ email });
    if (!user) {
      throw new NotFoundException(`User with ${email} not found`);
    }
    if (await this.compare(password, user.password)) {
      throw new BadRequestException('Unvalid data');
    }
    return user;
  }
}
