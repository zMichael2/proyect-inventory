import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../helpers/AuthHelpers/jwt.handle.helper";

export interface RequestExt extends Request {
  user?: string | JwtPayload;
  email?: string | JwtPayload;
}
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.header("x-token");
    const isUser = verifyToken(`${jwtByUser}`) as {
      name: string;
      email: string;
    };
    console.log(isUser);
    if (!isUser) {
      res.status(401).json({ message: "NO_VALID_TOKEN" });
    }

    req.user = isUser.name;

    req.email = isUser.email;

    next();
  } catch (error) {
    res.status(402).send({ message: "SESSION_NO_VALID" });
  }
};

export { checkJwt };
