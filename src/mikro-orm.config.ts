import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
import { Post } from "./entities/Post";
import path from "path";

export const ormConfig = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: process.env.DB_NAME,
  type: `postgresql`,
  debug: !IS_PRODUCTION,
} as Parameters<typeof MikroORM.init>[0];
