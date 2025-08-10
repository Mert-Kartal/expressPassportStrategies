import { Router } from "express";
import { AuthController } from "./controller";
import { validateBody } from "../middleware/validation";
import { registerSchema, loginSchema } from "../dto/auth";
import passport from "passport";
const router = Router();

router.post("/register", validateBody(registerSchema), AuthController.register);
router.post("/login", validateBody(loginSchema), AuthController.login);
router.get("/profile", AuthController.profile);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthController.googleCallback
);
export default router;
