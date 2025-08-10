import { Router } from "express";
import { AccountController } from "./controller";

const accountRouter = Router();

accountRouter.get("/", AccountController.getUserAccounts);
export default accountRouter;
