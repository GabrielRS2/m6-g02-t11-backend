import { Request, Response } from "express";

import { IProductsUpdateRequest } from "../../interfaces/products";
import { productsUpdateService } from "../../services/products/productsUpdate.service";

export const productsUpdateController = async (req: Request, res: Response) => {
  const {
    model,
    description,
    km,
    year,
    saleType,
    vehicleType,
    price,
    isActive,
    coverPhoto,
    photos,
  }: IProductsUpdateRequest = req.body;
  const { id } = req.params;

  const updatedProduct = await productsUpdateService(id, {
    model,
    description,
    km,
    year,
    saleType,
    vehicleType,
    price,
    isActive,
    coverPhoto,
    photos,
  });

  return res.json({
    message: "Product updated sucessfully",
    product: updatedProduct,
  });
};
