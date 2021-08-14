import { Router } from "express";
import { userController } from "../controller/user.controller";

var router = Router();

router.post("/signin", userController.signinV2);

export default router;
