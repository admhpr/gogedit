import { config } from "dotenv";
config();
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { ormConfig } from "./mikro-orm.config";

async function main() {
  const orm = await MikroORM.init(ormConfig);
  const post = orm.em.create(Post, { title: "first post" });
  await orm.em.persistAndFlush(post);
}

main().catch((error) => console.error(error));
