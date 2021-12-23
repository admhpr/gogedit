import { User } from "@entities/User";
import { AppContext } from "src/types";
import { Resolver, Mutation, InputType, Field, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ) {
    const { username, password } = options;
    const hashedPassword = await argon2.hash(password);
    const user = await em.create(User, { username, password: hashedPassword });
    em.persistAndFlush(user);
    return user;
  }
}
