import { Router } from "express";
import { userController } from "../controller/user.controller";

var router = Router();

router.post("/create", userController.createUser);

export default router;
