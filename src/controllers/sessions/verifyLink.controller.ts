import { Response, Request, NextFunction } from "express";
import { verifyLinkService } from "../../services/sessions/verifyLink.service";

export const verifyLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, token } = req.params;
  const { passord } = req.body;
  verifyLinkService(id, token, passord);
};
