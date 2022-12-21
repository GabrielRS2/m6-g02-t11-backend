import { Request, Response } from "express";

import { IProductsCreateRequest } from "../../interfaces/products";
import { productsCreateService } from "../../services/products/productsCreate.service";

export const productsCreateController = async (req: Request, res: Response) => {
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
  }: IProductsCreateRequest = req.body;

  const newProduct = await productsCreateService({
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

  return res.status(201).json({
    message: "Product created",
    product: newProduct,
  });
};
