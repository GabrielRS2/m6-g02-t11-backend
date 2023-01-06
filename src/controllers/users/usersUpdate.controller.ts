import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserUpdate } from "../../interfaces/users";
import { userUpdateService } from "../../services/users/usersUpdate.service";

export const userUpdateController = async (req: Request, res: Response) => {
  const {
    name,
    password,
    email,
    description,
    isSeller,
    dob,
    phone,
    cpf,
    cep,
    city,
    state,
    street,
    number,
    complement,
  }: IUserUpdate = req.body;
  const id = req.userId!;

  const updatedUser = await userUpdateService(id, {
    name,
    password,
    email,
    description,
    isSeller,
    dob,
    phone,
    cpf,
    cep,
    city,
    state,
    street,
    number,
    complement,
  });

  return res.status(201).json({
    message: "User updated successfully",
    user: instanceToPlain(updatedUser),
  });
};
