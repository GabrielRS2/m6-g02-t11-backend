import { Request, Response } from "express";
import { commentUpdateService } from "../../services/comments/commentUpdate.service";

export const commentUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  const updatedComment = await commentUpdateService(id, content);

  return res.status(201).json({
    message: "Comment updated successfully",
    comment: updatedComment,
  });
};
