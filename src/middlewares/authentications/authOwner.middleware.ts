import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { User } from "../../entities/user.entity";
import { Product } from "../../entities/products.entity";
import { Comment } from "../../entities/comments.entity";

// Deve ser usado em conjunto e diretamente depois do middleware <authUserMiddleware>, quando necessario o seu uso.
// Verifica se o recurso sendo alterado/deletado pertence ao dono do token.

export const authOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, isSeller } = req;
  const { id } = req.params;
  if (!id) {
    throw new AppError(400, "Missing <id> param on route");
  }

  const userRepo = AppDataSource.getRepository(User);
  const userFromToken = await userRepo.findOneBy({ id: userId });
  if (!userFromToken) {
    throw new AppError(404, "User not found <token>");
  }

  const route = req.originalUrl.split("/");

  if (route[1] === "users") {
    const affectedUser = await userRepo.findOneBy({ id: id });
    if (!affectedUser) {
      throw new AppError(404, "User not found <param>");
    }

    const notOwner = userFromToken.id != affectedUser.id;
    if (notOwner) {
      throw new AppError(401, "User must be the owner of the account");
    }

    return next();
  }

  //to do other routes (Products, comments)
};
