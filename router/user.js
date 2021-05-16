import { Router } from "express";
import { userController } from "../controller/user.controller";
import { AuthJWTFilter } from "../middleware/authJWT";

var router = Router();

router.post("/create", userController.createUser);
router.get(
  "/getuser",
  AuthJWTFilter.authorize("ROLE_ADMIN"),

  userController.getUserById
);

export default router;
