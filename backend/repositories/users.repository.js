import AppDataSource from "../db/data_source.js";

class UsersRepository {
  static create(user) {
    const usersRepository = AppDataSource.getRepository("User");
    return usersRepository.save(user);
  }
  static getByEmail(email) {
    const usersRepository =  AppDataSource.getRepository("User");
    return usersRepository.findOne({
      where: { email },
    });
  }
}

export default UsersRepository;
