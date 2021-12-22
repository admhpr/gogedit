import { config } from "dotenv";
config();
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { SERVER_PORT } from "./constants";
import ormConfig from "./mikro-orm.config";
import express from "express";

async function main() {
  const orm = await MikroORM.init(ormConfig);
  await orm.getMigrator().up();
  const app = express();
  app.listen(SERVER_PORT, () => {
    console.log(`app started on ${SERVER_PORT}`);
  });
}

main().catch((error) => console.error(error));
