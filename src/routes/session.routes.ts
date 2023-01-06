import { Router } from "express";

import { userLoginController } from "../controllers/sessions/userLogin.controller";
import { recoverPasswordController } from "../controllers/sessions/recoverPassword.controller";
import { verifyLinkController } from "../controllers/sessions/verifyLink.controller";

const routes = Router();

export const sessionRoutes = () => {
  routes.post("", userLoginController);
  routes.post("/reset-password/", recoverPasswordController);
  routes.post("/reset-password/:id/:token", verifyLinkController);
  return routes;
};
