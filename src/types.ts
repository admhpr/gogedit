import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";
import { Session } from "express-session";

export type RequestWithSession = Request & {
  session: Session & { userId: number };
};

export type AppContext = {
  em: EntityManager;
  req: RequestWithSession;
  res: Response;
};
