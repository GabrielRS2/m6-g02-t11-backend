import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/AppError";

import AppDataSource from "../../data-source";

export const commentUpdateService = async (
  id: string,
  content: string
): Promise<Comment> => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const comment = await commentRepo.findOneBy({ id });
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  comment.content = content;
  comment.update_at = new Date();
  await commentRepo.save(comment);

  return comment;
};
