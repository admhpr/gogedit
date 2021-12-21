import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
import { Post } from "./entities/Post";

export const ormConfig = {
  migrations: {
    path: "",
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: process.env.DB_NAME,
  type: `postgresql`,
  debug: !IS_PRODUCTION,
} as Parameters<typeof MikroORM.init>[0];
