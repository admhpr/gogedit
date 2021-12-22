import { Post } from "@entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }
  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number, @Ctx() { em }: Context): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }
}
