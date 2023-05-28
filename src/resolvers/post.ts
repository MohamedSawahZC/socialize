import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post]) // Provide explicit GraphQL type for the field
  async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true }) // Provide explicit GraphQL type for the field
  async post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post) // Provide explicit GraphQL type for the field
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, {
      title: title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true }) // Provide explicit GraphQL type for the field
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id: id });
    if (!post) {
      return null;
    }
    if (typeof title !== undefined) {
      post.title = title;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean) // Provide explicit GraphQL type for the field
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id: id });
      return true;
    } catch (e) {
      return false;
    }
  }
}
