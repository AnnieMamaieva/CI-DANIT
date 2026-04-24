import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Newspost } from "../entities/Newspost.js";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Newspost],
  migrations: ["db/migrations/*.js"],
  synchronize: false,
});
export default AppDataSource;
