import { Router } from "express";

import { createCommentController } from "../controllers/comments/createComment.controller";
import { authUserMiddleware } from "../middlewares/authentications/authUser.middleware";

const routes = Router();

export const commentsRoutes = () => {
  routes.post("/:productId", authUserMiddleware, createCommentController);

  return routes;
};
