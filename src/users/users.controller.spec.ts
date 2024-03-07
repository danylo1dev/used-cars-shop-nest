import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOneById: (id: number): Promise<User> => {
        const user = fakeUserService.findUniqueOrDotThrow({ id });
        if (!user) {
          throw new NotFoundException();
        }
        return Promise.resolve(user);
      },
      findUniqueOrDotThrow: (where: { id: number }) => {
        return Promise.resolve(
          new User({
            id: where.id,
            email: "mail@mail.com",
            password: "password",
          }),
        );
      },
      find: (where: { email: string }): Promise<User[]> => {
        return Promise.resolve([new User({ id: 1, email: where.email, password: "password" })]);
      },
      // remove: (): Promise<void> => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve(new User({ id: 1, email, password }));
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  describe("Find", () => {
    it("findAll returns a list of users with the given email", async () => {
      const users = await controller.findAll({ email: "test@mail.com" });
      expect(users.length).toEqual(1);
      expect(users[0].email).toEqual("test@mail.com");
    });
    it("findOne should return user with id", async () => {
      const user = await controller.findOne("1");
      expect(user).toBeDefined;
    });
    it("findUser throws an error if user with given id is not found", async () => {
      fakeUserService.findUniqueOrDotThrow = () => null;
      await expect(controller.findOne("1")).rejects.toThrow(NotFoundException);
    });
  });
  describe("signin", () => {
    it("should return update sesion and user ", async () => {
      const sesion: any = {};
      const user = await controller.login(
        {
          email: "test@mail.com",
          password: "password",
        },
        sesion,
      );
      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(sesion.userId).toEqual(user.id);
    });
  });
});
