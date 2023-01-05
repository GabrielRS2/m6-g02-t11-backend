import { Router } from "express";

import { userLoginController } from "../controllers/sessions/userLogin.controller";

const routes = Router();

export const sessionRoutes = () => {
  routes.post("", userLoginController);

  return routes;
};
