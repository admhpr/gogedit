import { User } from "@entities/User";
import { AppContext } from "src/types";
import { Resolver, Mutation, InputType, Field, Arg, Ctx } from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ) {
    const user = await em.create(User, { username: options.username });
    return user;
  }
}
