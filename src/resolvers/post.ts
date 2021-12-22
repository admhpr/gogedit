import { Post } from "../entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: Context) {
    return "post";
  }
}
