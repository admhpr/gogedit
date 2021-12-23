import { User } from "@entities/User";
import { AppContext } from "src/types";
import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";
import { USER_EXISTS_ERROR_CODE } from "src/constants";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ): Promise<UserResponse> {
    const { username, password } = options;
    if (!username.length) {
      return {
        errors: [
          {
            field: "username",
            message: "provide a username",
          },
        ],
      };
    }
    if (password.length) {
      return {
        errors: [
          {
            field: "password",
            message: "provide a password",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = await em.create(User, { username, password: hashedPassword });
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === USER_EXISTS_ERROR_CODE) {
        return {
          errors: [
            {
              field: "username",
              message: "username in use",
            },
          ],
        };
      }
    }

    return { user };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ): Promise<UserResponse> {
    const { username, password } = options;
    const user = await em.findOne(User, { username: username.toLowerCase() });
    if (!user) {
      return {
        errors: [{ field: "username", message: "invalid login" }],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "invalid login" }],
      };
    }
    return { user };
  }
}
