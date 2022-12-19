import { Router } from "express";

import { productsCreateController } from "../controllers/products/productsCreate.controller";
import { productsListController } from "../controllers/products/productsList.controller";

const routes = Router();

export const productsRoutes = () => {
  routes.post("", productsCreateController);
  routes.get("", productsListController);

  return routes;
};
