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
  const { userId } = req;
  const { id } = req.params;

  const userRepo = AppDataSource.getRepository(User);
  const userFromToken = await userRepo.findOneBy({ id: userId });
  if (!userFromToken) {
    throw new AppError(404, "User not found <token>");
  }

  const route = req.originalUrl.split("/");

  if (route[1] === "users") {
    return next();
  }

  if (route[1] === "products") {
    if (id) {
      //se id existir sabemos que estamos na rota de patch/soft-delete
      const productRepo = AppDataSource.getRepository(Product);
      const productAffected = await productRepo.findOneBy({
        id: id,
        user: userFromToken,
      });
      if (!productAffected) {
        throw new AppError(
          404,
          "Product not found, or User from token isn't it's owner"
        );
      }
      return next();
    } else {
      //se id nao existir, sabemos que estamos na criacao de produto
      if (!userFromToken.isSeller) {
        throw new AppError(401, "You must be a seller to create a listing");
      }
      return next();
    }
  }

  if (route[1] === "comments") {
    const commentsRepo = AppDataSource.getRepository(Comment);
    const commentAffected = await commentsRepo.findOneBy({
      user: userFromToken,
      id: id,
    });
    if (!commentAffected) {
      throw new AppError(404, "Comment not found");
    }
    return next();
  }
  throw new AppError(
    420,
    "Review the ownership middleware, it has a bug or it's being used in a route w/o necessity"
  );
};
