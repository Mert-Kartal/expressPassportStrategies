import passport from "passport";
import { AuthService } from "./service";
import { Request, Response, NextFunction } from "express";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", data: result });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate(
        "local",
        async (err: Error, user: any, info: any) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({ message: info.message });
          }

          const result = await AuthService.login(user);
          res
            .status(200)
            .json({ message: "Logged in successfully", data: result });
        }
      )(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        res.status(200).json({ message: "success", user });
      }
    )(req, res, next);
  }
}
