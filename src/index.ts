import { config } from "dotenv";
config();
import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
import { Post } from "./entities/Post";
async function main() {
  const orm = await MikroORM.init({
    dbName: "",
    type: "postgresql",
    debug: !IS_PRODUCTION,
  });

  const post = orm.em.create(Post, { title: "first post" });
  await orm.em.persistAndFlush(post);
}

main().catch((error) => console.error(error));
