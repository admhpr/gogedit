import "reflect-metadata";
import path from "path";
import { config } from "dotenv";
config({ path: path.join(__dirname, "../../.env") });
import { MikroORM } from "@mikro-orm/core";
import { CLIENT_PORT, IS_PRODUCTION, ONE_YEAR_IN_MS, SERVER_PORT } from "./constants";
import ormConfig from "./mikro-orm.config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { PostResolver } from "@resolvers/post";
import { UserResolver } from "@resolvers/user";

// @ts-expect-error no redis types 3.1.2
import redis from "redis";

import session from "express-session";
import connectRedis, { Client } from "connect-redis";

async function main() {
  const orm = await MikroORM.init(ormConfig);
  await orm.getMigrator().up();
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({ origin: `http://localhost:${CLIENT_PORT}`, credentials: true })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient as unknown as Client,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET as string,
      cookie: {
        maxAge: ONE_YEAR_IN_MS,
        httpOnly: true,
        sameSite: "lax", // prevent https://en.wikipedia.org/wiki/Cross-site_request_forgery
        secure: IS_PRODUCTION,
      },
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(SERVER_PORT, () => {
    console.log(`server running on http://localhost:${SERVER_PORT}/graphql 🚀`);
  });
}

main().catch((error) => console.error(error));
