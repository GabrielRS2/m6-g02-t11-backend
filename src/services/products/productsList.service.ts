
import { Product } from "../../entities/products.entity";
import AppDataSource from "../../data-source";

export const listAllProductsService = async (): Promise<Product[]> => {
  const productRepository = AppDataSource.getRepository(Product);

  const productsList = await productRepository.find();

  return productsList;
};
