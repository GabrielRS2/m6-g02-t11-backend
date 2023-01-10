import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { userListByIdService } from "../../services/users/userListById.service";

export const userListByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userById = await userListByIdService(id);
  return res.status(200).json({
    message: "User retrieved sucessfully",
    user: instanceToPlain(userById),
  });
};
