import { Router } from "express";
import { userController } from "../controller/user.controller";
import { AuthJWTFilter } from "../middleware/authJWT";

var router = Router();

router.post("/create", userController.createUser);
router.get(
  "/current-user",
  AuthJWTFilter.authorize(),
  userController.getCurrentUser
);

router.get(
  "/getuser",
  AuthJWTFilter.authorize("ROLE_ADMIN"),

  userController.getUserById
);
router.get(
  "/getuser",
  AuthJWTFilter.authorize,

  userController.getUserById
);

export default router;
