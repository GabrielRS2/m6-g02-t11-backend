import { Router } from "express";

import { userCreateSchema } from "../schemas/users/usersCreate.schema";
import { validateUserCreate } from "../middlewares/users/validateUserCreate.middleware";
import { authUserMiddleware } from "../middlewares/authentications/authUser.middleware";
import { authOwnerMiddleware } from "../middlewares/authentications/authOwner.middleware";

import { userCreateController } from "../controllers/users/usersCreate.controller";
import { userUpdateController } from "../controllers/users/usersUpdate.controller";
import { userListByIdController } from "../controllers/users/userListById.controller";

const routes = Router();

export const usersRoutes = () => {
  routes.get("/:id", userListByIdController);
  routes.post("", validateUserCreate(userCreateSchema), userCreateController);
  routes.patch(
    "/:userId",
    authUserMiddleware,
    authOwnerMiddleware,
    userUpdateController
  );
  return routes;
};
