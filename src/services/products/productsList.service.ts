import { Product } from "../../entities/products.entity";
import AppDataSource from "../../data-source";
import { instanceToPlain } from "class-transformer";

export const listAllProductsService = async (): Promise<Product[]> => {
  const productRepository = AppDataSource.getRepository(Product);

  const productsList = await productRepository.find({
    relations: {
      photos: true,
      user: true,
    },
    where: {
      photos: { is_cover_img: true },
    },
  });

  return productsList;
};
