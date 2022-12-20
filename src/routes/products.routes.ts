import { Router } from "express";

import { productsCreateController } from "../controllers/products/productsCreate.controller";

import { productsListController } from "../controllers/products/productsList.controller";

import { productUpdateController } from "../controllers/products/productsUpdate.controller";

import { validateProductCreate } from "../middlewares/products/validateProductCreate.middleware";
import { productCreateSchema } from "../schemas/products/productsCreate.schema";


const routes = Router();

export const productsRoutes = () => {

  routes.post("", productsCreateController);
  routes.get("", productsListController);

  routes.post(
    "",
    /*, validateProductCreate(productCreateSchema)*/
    productsCreateController
  );
  routes.patch("/:id", productUpdateController);

  return routes;
};
