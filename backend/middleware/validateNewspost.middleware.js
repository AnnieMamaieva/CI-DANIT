import { validateNewspost } from "../schemas/newspostSchema.js";
import ValidationError from "../errors/ValidationError.js";

const validateNewspostMiddleware = (req, res, next) => {
  const result = validateNewspost(req.body);
  if (result !== true) {
    return next(new ValidationError("Validation failed", result));
  }
  next();
};

export default validateNewspostMiddleware;