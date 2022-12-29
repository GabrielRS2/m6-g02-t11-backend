import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";

import { appRoutes } from "./routes";
import handleErrorMiddleware from "./middlewares/errors/handleError.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Back-end OK!" });
});

appRoutes(app);
app.use(handleErrorMiddleware);

export default app;
