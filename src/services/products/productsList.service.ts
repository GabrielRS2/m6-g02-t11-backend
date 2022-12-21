import { Product } from "../../entities/products.entity";
import AppDataSource from "../../data-source";

export const listAllProductsService = async (): Promise<Product[]> => {
  const productRepository = AppDataSource.getRepository(Product);

  const productsList = await productRepository.find({
    relations: {
      photos: true,
    },
    where: {
      photos: { is_cover_img: true },
    },
  });

  return productsList;
};
