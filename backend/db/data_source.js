import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Newspost } from "../entities/Newspost.js";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "annamamaeva",
  password: "annamamaeva",
  database: "news_typeorm_db",
  logging: false,
  entities: [User, Newspost],
  migrations: ["db/migrations/*.js"],
  synchronize: false,
});
export default AppDataSource;
