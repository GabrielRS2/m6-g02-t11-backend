import { Response, Request } from "express";
import { userLoginService } from "../../services/sessions/userLogin.service";

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = userLoginService({ email, password });

  return res.status(200).json({ token: token });
};
