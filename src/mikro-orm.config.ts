import { Post } from "./entities/Post";

export default {
  entities: [Post],
  dbName: process.env.DB_NAME,
  type: `postgresql`,
};
