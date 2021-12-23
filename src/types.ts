import { EntityManager } from "@mikro-orm/postgresql";

export type AppContext = {
  em: EntityManager;
};
