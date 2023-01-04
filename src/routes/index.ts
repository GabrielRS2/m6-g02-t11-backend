import { Express } from "express";

import { productsRoutes } from "./products.routes";
import { sessionRoutes } from "./session.routes";
import { usersRoutes } from "./users.routes";

export const appRoutes = (app: Express) => {
  app.use("/products", productsRoutes());
  app.use("/users", usersRoutes());
  app.use("/login", sessionRoutes());
};
