import { Router } from "express";

import { userCreateSchema } from "../schemas/users/usersCreate.schema";
import { validateUserCreate } from "../middlewares/users/validateUserCreate.middleware";

import { userCreateController } from "../controllers/users/usersCreate.controller";

const routes = Router();

export const usersRoutes = () => {
  routes.post("", validateUserCreate(userCreateSchema), userCreateController);

  return routes;
};
