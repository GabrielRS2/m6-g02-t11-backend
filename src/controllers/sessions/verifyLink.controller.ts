import { Response, Request, NextFunction } from "express";
import { verifyLinkService } from "../../services/sessions/verifyLink.service";

export const verifyLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, token } = req.params;
  const { password } = req.body;
  return res
    .send(await verifyLinkService(id, token, password))
    .json({ message: "Sua senha foi redefinida!" });
};
