import { config } from "dotenv";
config();
import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION, SERVER_PORT } from "./constants";
import ormConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "@resolvers/post";
import { UserResolver } from "@resolvers/user";

import { createClient } from "redis";

import session from "express-session";
import connectRedis, { Client } from "connect-redis";

async function main() {
  const orm = await MikroORM.init(ormConfig);
  await orm.getMigrator().up();
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient as unknown as Client,
        disableTouch: true,
      }),
      secret: "meh",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: IS_PRODUCTION,
      },
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(SERVER_PORT, () => {
    console.log(`server running on http://localhost:${SERVER_PORT}/graphql 🚀`);
  });
}

main().catch((error) => console.error(error));
