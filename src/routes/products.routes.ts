import { Router } from "express";

import { productsCreateController } from "../controllers/products/productsCreate.controller";
import { productsListController } from "../controllers/products/productsList.controller";
import { productsUpdateController } from "../controllers/products/productsUpdate.controller";
import { productsDeleteController } from "../controllers/products/productsDelete.controller";
import { productListController } from "../controllers/products/productList.controller";

import { validateProductCreate } from "../middlewares/products/validateProductCreate.middleware";
import { productCreateSchema } from "../schemas/products/productsCreate.schema";

const routes = Router();

export const productsRoutes = () => {
  routes.get("", productsListController);
  routes.post("", productsCreateController);
  routes.patch("/:id", productsUpdateController);
  routes.post(
    "",
    /*, validateProductCreate(productCreateSchema)*/
    productsCreateController
  );
  routes.delete("/:id", productsDeleteController);
  routes.get("/:id", productListController);

  return routes;
};
