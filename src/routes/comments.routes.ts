import { Router } from "express";

import { commentsListFromProductController } from "../controllers/comments/commentsListFromProduct.controller";
import { createCommentController } from "../controllers/comments/createComment.controller";
import { commentUpdateController } from "../controllers/comments/commentUpdate.controller";

import { authUserMiddleware } from "../middlewares/authentications/authUser.middleware";
import { authOwnerMiddleware } from "../middlewares/authentications/authOwner.middleware";

const routes = Router();

export const commentsRoutes = () => {
  routes.post("/:productId", authUserMiddleware, createCommentController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    authOwnerMiddleware,
    commentUpdateController
  );
  routes.get("/:id", authUserMiddleware, commentsListFromProductController);
  return routes;
};
