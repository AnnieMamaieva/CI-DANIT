import UserService from "../services/users.service.js";
import ValidationError from "../errors/ValidationError.js";

class AuthController {
  static async register(req, res, next) {
    try {
      const data = req.body;
      const result = await UserService.register(data);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ValidationError("All fields are required"));
      }
      const result = await UserService.login({ email, password });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static getUser(req, res) {
    res.json(req.user);
  }
}

export default AuthController;
