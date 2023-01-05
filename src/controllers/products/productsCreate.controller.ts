import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

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

  const { userId } = req;
  if (!userId) {
    throw new AppError(404, "This route requires authentication");
  }

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
    userId,
  });

  return res.status(201).json({
    message: "Product created",
    product: { ...newProduct, user: instanceToPlain(newProduct.user) },
  });
};
