import { Request, Response } from "express";

import { listAllProductsService } from "../../services/products/productsList.service";

export const productsListController = async (req: Request, res: Response) => {
  const productsList = await listAllProductsService();
  return res.status(200).json(productsList);
};
