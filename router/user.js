import { Router } from "express";
import { userController } from "../controller/user.controller";
import { AuthJWTFilter } from "../middleware/authJWT";

var router = Router();

router.post("/create", userController.createUser);

router.get(
  "/account",
  AuthJWTFilter.authorize(),
  userController.getCurrentUser
);

export default router;
