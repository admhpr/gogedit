import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
import { Post } from "@entities/Post";
import { User } from "@entities/User";
import path from "path";

console.log(process.env);
export default {
  dbName: process.env.DB_NAME,
  debug: !IS_PRODUCTION,
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  password: process.env.DB_PASSWORD,
  type: `postgresql`,
  user: process.env.DB_USER,
} as Parameters<typeof MikroORM.init>[0];
