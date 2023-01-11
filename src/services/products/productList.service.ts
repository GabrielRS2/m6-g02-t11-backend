import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";

export const listProductService = async (id: string): Promise<Product> => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.find({
    relations: { photos: true, user: true },
    where: { id: id },
  });
  if (product.length == 0) {
    throw new AppError(404, "Product not found");
  }

  return product[0];
};
