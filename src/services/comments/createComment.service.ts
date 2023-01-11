import AppDataSource from "../../data-source";
import { Product } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/comments.entity";
import { instanceToPlain } from "class-transformer";

export const createCommentService = async (
  productId: string,
  content: string,
  userEmail: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const commentsRepository = AppDataSource.getRepository(Comment);

  const user = await userRepository.findOneBy({ email: userEmail });

  if (!user) {
    throw new AppError(403, "User not found");
  }

  const product = await productRepository.findOneBy({ id: productId });
  if (!product) {
    throw new AppError(403, "Product not found");
  }

  const newComment = commentsRepository.create({
    content: content,
    user: user,
    product: product,
  });

  await commentsRepository.save(newComment);

  const commentToReturn = {
    id: newComment.id,
    content: newComment.content,
    user: user,
    created_at: newComment.created_at.toLocaleString(),
    updated_at: newComment.update_at.toLocaleString(),
  };

  return instanceToPlain(commentToReturn);
};
