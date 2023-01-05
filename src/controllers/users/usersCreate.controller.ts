import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserCreate } from "../../interfaces/users";

import { userCreateService } from "../../services/users/usersCreate.service";

export const userCreateController = async (req: Request, res: Response) => {
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
  }: IUserCreate = req.body;

  const user = await userCreateService({
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
    message: "User created successfully",
    user: instanceToPlain(user),
  });
};
