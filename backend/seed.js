import "dotenv/config";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import AppDataSource from "./db/data_source.js";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB connected");
    const userRepository = AppDataSource.getRepository("User");
    console.log("Repos are ready");
    const createOrUpdateUser = async (email, channel) => {
      let user = await userRepository.findOneBy({ email });
      if (!user) {
        const hashedPassword = await bcrypt.hash("seed123456", 10);
        user = userRepository.create({
          email,
          password: hashedPassword,
        });
      }
      user.sendNotification = true;
      user.notificationChannel = channel;
      return userRepository.save(user);
    };
    const logUser = await createOrUpdateUser("loguser@test.com", "log");
    const alertUser = await createOrUpdateUser("alertuser@test.com", "alert");
    console.log("Users ready:", logUser.email, alertUser.email);

    const newspostRepository = AppDataSource.getRepository("Newspost");
    const existingPostsCount = await newspostRepository.count();
    console.log("Existing posts:", existingPostsCount);
    if (existingPostsCount > 0) {
      console.log("Posts already exist, not adding seed");
      return;
    }
    const fakePostsArray = Array.from({ length: 20 }, () => ({
      header: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      author: logUser,
    }));

    console.log("Fake posts ready:", fakePostsArray.length);
    await newspostRepository.save(fakePostsArray);
    console.log("Added 20 posts successfully to DB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await AppDataSource.destroy();
  }
};
seed();
