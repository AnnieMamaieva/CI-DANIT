import AppDataSource from "../db/data_source.js";

class UsersRepository {
  static create(user) {
    const usersRepository = AppDataSource.getRepository("User");
    return usersRepository.save(user);
  }
  static getByEmail(email) {
    const usersRepository = AppDataSource.getRepository("User");
    return usersRepository.findOne({
      where: { email },
    });
  }
  static getUsersForNotifications() {
    const usersRepository = AppDataSource.getRepository("User");

    return usersRepository.find({
      where: {
        sendNotification: true,
      },
    });
  }
}

export default UsersRepository;
