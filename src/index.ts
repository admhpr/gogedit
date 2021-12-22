import { config } from "dotenv";
config();
import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post"
import { SERVER_PORT } from "./constants";
import ormConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

async function main() {
  const orm = await MikroORM.init(ormConfig);
  await orm.getMigrator().up();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(SERVER_PORT, () => {
    console.log(`app started on ${SERVER_PORT}`);
  });
}

main().catch((error) => console.error(error));
