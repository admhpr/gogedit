import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";
import { Session } from "express-session";

export type AppContext = {
  em: EntityManager;
  req: Request & { session: Session };
  res: Response;
};
