import { Request, Response } from "express";
import { commentsListFromProductService } from "../../services/comments/commentsListFromProduct.service";

export const commentsListFromProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const commentsList = await commentsListFromProductService(id);
  return res.status(200).json({
    message: "Comments retrieved sucessfully",
    comments: commentsList,
  });
};
