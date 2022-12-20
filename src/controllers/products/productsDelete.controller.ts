import { Request, Response } from "express";

import { productsDeleteService } from "../../services/products/productsDelete.service";

export const productsDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await productsDeleteService(id);
  return res.status(200).json({ message: "Product deleted sucessfully" });
};
