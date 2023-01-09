import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Comment } from "../../entities/comments.entity";

export const commentDeleteService = async (id: string) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const commentToDelete = await commentRepo.findOneBy({ id });
  if (!commentToDelete) {
    throw new AppError(404, "Comment not found");
  }

  await commentRepo.remove(commentToDelete);
  return "Comment deleted successfully";
};
