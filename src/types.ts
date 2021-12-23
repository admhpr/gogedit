import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";

export type AppContext = {
  em: EntityManager;
  req: Request;
  res: Response;
};
