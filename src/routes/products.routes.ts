import { Router } from "express";

import { productsCreateController } from "../controllers/products/productsCreate.controller";

const routes = Router();
export const productsRoutes = () => {
  routes.post("", productsCreateController);

  return routes;
};
