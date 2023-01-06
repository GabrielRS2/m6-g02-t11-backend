import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";

export const productsListFromSellerService = async (
  id: string
): Promise<Product[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  const user = await userRepo.findOneBy({ id });
  if (!user) {
    throw new AppError(404, "User not found <param>");
  }
  if (!user.isSeller) {
    throw new AppError(400, "User is not a seller");
  }

  const products = await productRepo.find({
    relations: { user: true, photos: true },
    where: { user: user },
  });

  return products;
};
