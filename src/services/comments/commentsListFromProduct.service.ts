import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";
import { Comment } from "../../entities/comments.entity";

export const commentsListFromProductService = async (
  id: string
): Promise<Comment[]> => {
  const productRepo = AppDataSource.getRepository(Product);
  const commentRepo = AppDataSource.getRepository(Comment);

  const product = await productRepo.findOneBy({ id });
  if (!product) {
    throw new AppError(404, "Product not found<param>");
  }

  const comments = await commentRepo.find({
    relations: { product: true, user: true },
    where: { product: product },
  });

  return comments;
};
