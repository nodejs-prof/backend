import { Router } from "express";
import { userController } from "../controller/user.controller";

var router = Router();

router.post("/signin", userController.signin);


export default router;
