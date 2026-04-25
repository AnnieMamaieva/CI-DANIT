import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Newspost } from "../entities/Newspost.js";

const isProduction = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities: [User, Newspost],
  migrations: ["db/migrations/*.js"],
  synchronize: true,
});
export default AppDataSource;
