import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      create: (input: CreateUserDto): Promise<User> => {
        const user = new User({
          ...input,
          id: Math.floor(Math.random() * 9999999),
        });
        users.push(user);
        return Promise.resolve(user) as Promise<User>;
      },
      find: (where: { email: string }) => {
        const filtredUsers = users.filter((user) => user.email === where.email);

        return Promise.resolve([...filtredUsers]);
      },
      findUniqueOrDotThrow: (where: { email: string }) => {
        const user = users.find((user) => user.email === where.email);
        return Promise.resolve(user) as Promise<User>;
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: fakeUserService }, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create new user with a salted and hashed password", async () => {
    const user = await service.signup({
      email: "email@mail.com",
      password: "asdsa",
    });
    expect(user.password).not.toEqual("asdsa");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it("throws if signin is called with an unused email", async () => {
    await expect(service.signin("asdflkj@asdlfkj.com", "passdflkj")).rejects.toThrow(NotFoundException);
  });
  it("throws if an invalid password is provided", async () => {
    const testUser = { email: "asdf@asdf.com", password: "laskdjf" };
    await service.signup(testUser);
    fakeUserService.find = () => Promise.resolve([{ email: "asdf@asdf.com", password: "laskdjf" } as User]);
    await expect(service.signin(testUser.email, testUser.password + "adsad")).rejects.toThrow(BadRequestException);
  });
  it("returns a user if correct password is provider", async () => {
    const testUser = { email: "asdf@asdf.com", password: "laskdjf" };
    await service.signup(testUser);
    const user = await service.signin(testUser.email, testUser.password);
    expect(user).toBeDefined();
  });
});
