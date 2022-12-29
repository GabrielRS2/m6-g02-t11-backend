import { Request, Response } from "express";

import { listProductService } from "../../services/products/productList.service";

export const productListController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await listProductService(id);

  return res
    .status(200)
    .json({ message: "Product retrieved sucessfully", product: product });
};
