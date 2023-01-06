import { Router } from "express";
import { commentsListFromProductController } from "../controllers/comments/commentsListFromProduct.controller";

import { createCommentController } from "../controllers/comments/createComment.controller";
import { authUserMiddleware } from "../middlewares/authentications/authUser.middleware";

const routes = Router();

export const commentsRoutes = () => {
  routes.post("/:productId", authUserMiddleware, createCommentController);
  routes.get("/:id", authUserMiddleware, commentsListFromProductController);
  return routes;
};
