import { Request, Response } from "express";
import { createCommentService } from "../../services/comments/createComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { productId } = req.params;
  const userEmail: any = req.userEmail;

  const createdComment = await createCommentService(
    productId,
    content,
    userEmail
  );

  return res.status(201).json({
    message: "Comment created successfully",
    comment: createdComment,
  });
};
