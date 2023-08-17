import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Client } from "./entity/User";
import { CryptoBeingTracked } from "./entity/CryptoBeingTracked";
import { Following } from "./entity/Following";
import { Followers } from "./entity/Followers";
import { ProfileImage } from "./entity/ProfileImage";
import { InvestedCrypto } from "./entity/InvestedCrypto";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Client,
    CryptoBeingTracked,
    Following,
    Followers,
    ProfileImage,
    InvestedCrypto,
  ],
  migrations: [],
  subscribers: [],
});
