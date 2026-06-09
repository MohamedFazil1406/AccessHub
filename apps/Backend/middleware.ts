import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "Token missing",
    });
  }

  const response = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
  req.userId = response.id;
  req.role = response.role;

  next();
}
