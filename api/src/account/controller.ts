import { Request, Response } from "express";
import { AccountService } from "./service";

export class AccountController {
  static async getUserAccounts(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "User not authenticated or user ID not found." });
      }

      const accounts = await AccountService.findByUserId(userId);
      res.status(200).json({
        message: "User accounts retrieved successfully",
        data: accounts,
      });
    } catch (error) {
      console.error("Error fetching user accounts:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}
