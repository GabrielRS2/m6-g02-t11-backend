import { Router } from "express";

import { productsCreateController } from "../controllers/products/productsCreate.controller";
import { productsListController } from "../controllers/products/productsList.controller";
import { productsUpdateController } from "../controllers/products/productsUpdate.controller";
import { productsDeleteController } from "../controllers/products/productsDelete.controller";
import { productListController } from "../controllers/products/productList.controller";
import { productsListFromSellerController } from "../controllers/products/productsListFromSeller.controller";

import { productCreateSchema } from "../schemas/products/productsCreate.schema";
import { productUpdateSchema } from "../schemas/products/productsUpdate.schema";
import { validateProductCreate } from "../middlewares/products/validateProductCreate.middleware";
import { validateProductUpdate } from "../middlewares/products/validateProductUpdate.middleware";

import { authUserMiddleware } from "../middlewares/authentications/authUser.middleware";
import { authOwnerMiddleware } from "../middlewares/authentications/authOwner.middleware";

const routes = Router();

export const productsRoutes = () => {
  routes.get("", productsListController);
  routes.post(
    "",
    authUserMiddleware,
    authOwnerMiddleware,
    validateProductCreate(productCreateSchema),
    productsCreateController
  );
  routes.patch(
    "/:id",
    authUserMiddleware,
    authOwnerMiddleware,
    validateProductUpdate(productUpdateSchema),
    productsUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    authOwnerMiddleware,
    productsDeleteController
  );
  routes.get("/:id", productListController);
  routes.get("/user/:id", productsListFromSellerController);

  return routes;
};
