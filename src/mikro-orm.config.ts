import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
import { Post } from "./entities/Post";
export default {
  entities: [Post],
  dbName: process.env.DB_NAME,
  type: `postgresql`,
  debug: !IS_PRODUCTION,
} as Parameters<typeof MikroORM.init>[0];
