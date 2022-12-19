import { Express } from "express";

import { productsRoutes } from "./products.routes";

export const appRoutes = (app: Express) => {
  app.use("/products", productsRoutes());
};
