import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import { IProductsUpdateRequest } from "../../interfaces/products";
import { productsUpdateService } from "../../services/products/productsUpdate.service";

export const productUpdateController = async (req: Request, res: Response) => {
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
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
