import UsersRepository from "../repositories/users.repository.js";
import UserServiceError from "../errors/UserServiceError.js";
import ValidationError from "../errors/ValidationError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async register(data) {
    const { email, password } = data;
    const userAlreadyExists = await UsersRepository.getByEmail(email);
    if (userAlreadyExists) {
      throw new ValidationError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UsersRepository.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return {
      token: `Bearer ${token}`,
    };
  }
  static async login(data) {
    const { email, password } = data;
    const user = await UsersRepository.getByEmail(email);
    if (!user) {
      throw new UserServiceError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UserServiceError("Invalid email or password", 401);
    }
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return {
      token: `Bearer ${token}`,
    };
  }
}
export default UserService;
