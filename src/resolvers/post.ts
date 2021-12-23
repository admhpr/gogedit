import { Post } from "@entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AppContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: AppContext): Promise<Post[]> {
    return em.find(Post, {});
  }
  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number, @Ctx() { em }: AppContext): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: AppContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }
  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: AppContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }
  @Mutation(() => Number)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: AppContext
  ): Promise<number> {
    const postId = await em.nativeDelete(Post, { id });
    return postId;
  }
}
