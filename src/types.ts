import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";

export type AppContext = {
  em: EntityManager;
  req: Request & { session: { userId: number } };
  res: Response;
};
