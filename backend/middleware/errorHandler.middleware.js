import ValidationError from "../errors/ValidationError.js";
import NewspostsServiceError from "../errors/NewspostsServiceError.js";
import UserServiceError from "../errors/UserServiceError.js";
import logger from "../logger.js";
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    logger.warn(err.message);
    return res.status(400).json({ message: err.message, details: err.details });
  }
  if (err instanceof NewspostsServiceError) {
    logger.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ message: err.message });
  }
  if (err instanceof UserServiceError) {
    logger.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(err.status || 500).json({ message: err.message });
  }
  logger.error({
    message: err.message,
    stack: err.stack,
  });
  return res.status(500).json({ message: "Internal server Error" });
};

export default errorHandlerMiddleware;
