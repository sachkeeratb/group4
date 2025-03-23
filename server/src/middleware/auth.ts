import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  user: {
    id: string;
  };
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export default (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Get token from cookies (for Next.js integration)
  const token =
    req.cookies?.["next-auth.session-token"] || req.header("x-auth-token");

  // Check if no token
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
