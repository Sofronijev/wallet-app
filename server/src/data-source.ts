import "reflect-metadata";
import { DataSource } from "typeorm";
import { configDB } from "./config";
import { Category } from "./entities/Category";
import { Expense } from "./entities/Expense";
import { Income } from "./entities/Income";
import { Type } from "./entities/Type";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: configDB.host,
  port: 3306,
  username: configDB.user,
  password: configDB.password,
  database: configDB.database,
  charset: "utf8_general_ci",
  synchronize: true,
  logging: false,
  entities: [User, Category, Type, Expense, Income],
  migrations: [],
  subscribers: [],
});
