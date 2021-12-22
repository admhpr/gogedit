import { Post } from "../entities/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return "hello";
  }
}
