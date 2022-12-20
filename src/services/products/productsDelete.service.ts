import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";
import { Photo } from "../../entities/photos.entity";

export const productsDeleteService = async (id: string) => {
  const productRepo = AppDataSource.getRepository(Product);
  const photosRepo = AppDataSource.getRepository(Photo);

  const productToDelete = await productRepo.findOneBy({ id });
  if (!productToDelete) {
    throw new AppError(404, "Product not found");
  }

  const photosToDelete = await photosRepo.find({
    where: { product: productToDelete },
  });
  if (photosToDelete) {
    await photosRepo.remove(photosToDelete);
  }

  await productRepo.delete(productToDelete);
  return "Product deleted sucessfully";
};
