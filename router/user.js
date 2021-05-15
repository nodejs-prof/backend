import { Router } from "express";
import { userController } from "../controller/user.controller";

var router = Router();

router.post("/create", userController.createUser);
router.get("/getuser", userController.getUserById);

export default router;
