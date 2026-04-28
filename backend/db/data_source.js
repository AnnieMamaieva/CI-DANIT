import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Newspost } from "../entities/Newspost.js";

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "USING DB:",
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL,
);
const AppDataSource = new DataSource({
  type: "postgres",
  url: isTest ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities: [User, Newspost],
  migrations: isTest ? [] : ["db/migrations/*.js"],
  synchronize: true,
});
export default AppDataSource;
