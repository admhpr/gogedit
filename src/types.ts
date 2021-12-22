import { EntityManager } from "@mikro-orm/postgresql";

export type Context = {
  em: EntityManager;
};
