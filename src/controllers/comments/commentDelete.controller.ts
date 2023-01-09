import { Request, Response } from "express";
import { commentDeleteService } from "../../services/comments/commentsDelete.service";

export const commentDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await commentDeleteService(id);

  return res.status(200).json({
    message: "Comment deleted successfully",
  });
};
