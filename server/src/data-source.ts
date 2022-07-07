import "reflect-metadata"
import { DataSource } from "typeorm"
import { Budget } from "./entities/Budget"
import { Category } from "./entities/Category"
import { Type } from "./entities/Type"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "wallet_db",
    charset: "utf8_general_ci",
    synchronize: true,
    logging: false,
    entities: [User, Category, Type, Budget],
    migrations: [],
    subscribers: [],
})
