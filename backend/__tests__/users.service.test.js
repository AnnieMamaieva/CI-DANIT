import UserService from "../services/users.service.js";
import UsersRepository from "../repositories/users.repository.js";
import ValidationError from "../errors/ValidationError.js";
import UserServiceError from "../errors/UserServiceError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../repositories/users.repository.js", () => ({
  __esModule: true,
  default: {
    getByEmail: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  test("register should create user and return token", async () => {
    const data = {
      email: "test@test.com",
      password: "password123",
    };

    UsersRepository.getByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed-password");
    UsersRepository.create.mockResolvedValue({
      email: data.email,
      password: "hashed-password",
    });
    jwt.sign.mockReturnValue("fake-token");

    const result = await UserService.register(data);

    expect(UsersRepository.getByEmail).toHaveBeenCalledWith(data.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
    expect(UsersRepository.create).toHaveBeenCalledWith({
      email: data.email,
      password: "hashed-password",
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: data.email },
      "test-secret",
      { expiresIn: "1h" },
    );
    expect(result).toEqual({
      token: "Bearer fake-token",
    });
  });

  test("register should throw ValidationError if user already exists", async () => {
    UsersRepository.getByEmail.mockResolvedValue({
      email: "test@test.com",
    });

    await expect(
      UserService.register({
        email: "test@test.com",
        password: "password123",
      }),
    ).rejects.toThrow(ValidationError);
  });

  test("login should return token if credentials are valid", async () => {
    const data = {
      email: "test@test.com",
      password: "password123",
    };

    const user = {
      email: data.email,
      password: "hashed-password",
    };

    UsersRepository.getByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-token");

    const result = await UserService.login(data);

    expect(UsersRepository.getByEmail).toHaveBeenCalledWith(data.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(data.password, user.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: data.email },
      "test-secret",
      { expiresIn: "1h" },
    );
    expect(result).toEqual({
      token: "Bearer fake-token",
    });
  });

  test("login should throw UserServiceError if user does not exist", async () => {
    UsersRepository.getByEmail.mockResolvedValue(null);

    await expect(
      UserService.login({
        email: "missing@test.com",
        password: "password123",
      }),
    ).rejects.toThrow(UserServiceError);
  });

  test("login should throw UserServiceError if password is invalid", async () => {
    UsersRepository.getByEmail.mockResolvedValue({
      email: "test@test.com",
      password: "hashed-password",
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(
      UserService.login({
        email: "test@test.com",
        password: "wrong-password",
      }),
    ).rejects.toThrow(UserServiceError);
  });
});
