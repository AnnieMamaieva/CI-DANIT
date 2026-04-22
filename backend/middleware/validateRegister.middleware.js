import ValidationError from "../errors/ValidationError.js";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateRegisterMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ValidationError("All fields are required"));
  }

  if (!emailRegex.test(email)) {
    return next(new ValidationError("Invalid email"));
  }

  next();
};
export default validateRegisterMiddleware;
