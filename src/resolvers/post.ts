import { Post } from "@entities/Post";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
}
