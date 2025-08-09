import { Router } from "express";
import { AuthController } from "./controller";
import { validateBody } from "../middleware/validation";
import { registerSchema, loginSchema } from "../dto/auth";
const router = Router();

router.post("/register", validateBody(registerSchema), AuthController.register);
router.post("/login", validateBody(loginSchema), AuthController.login);
router.get("/profile", AuthController.profile);

export default router;
