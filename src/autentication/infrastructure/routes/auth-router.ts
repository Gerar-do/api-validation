import { Router, Request, Response, NextFunction } from "express";
import { authController } from "../dependencies";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
    authController.login(req, res).catch(next);
});

authRouter.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    authController.logout(req, res).catch(next);
});

export { authRouter };
