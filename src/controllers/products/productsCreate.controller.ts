import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import { IProductsCreateRequest } from "../../interfaces/products";
import { productsCreateService } from "../../services/products/productsCreate.service";

export const productsCreateController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
