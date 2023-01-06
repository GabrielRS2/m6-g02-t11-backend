import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { productsListFromSellerService } from "../../services/products/productsListFromSeller.service";

export const productsListFromSellerController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const productsList = await productsListFromSellerService(id);
  return res.status(200).json({
    message: "Products retrieved sucessfully",
    products: instanceToPlain(productsList),
  });
};
