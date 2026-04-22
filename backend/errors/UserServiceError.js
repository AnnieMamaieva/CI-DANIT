class UserServiceError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "UserServiceError";
    this.status = status;
  }
}

export default UserServiceError;
