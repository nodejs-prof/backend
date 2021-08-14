import { Router } from "express";
import { userController } from "../controller/user.controller";
import { AuthJWTFilter } from "../middleware/authJWT";

var router = Router();

router.post("/create", userController.createUserWithCognito);
router.get("/all", AuthJWTFilter.authorize(), userController.getAllUsers);

router.get(
  "/account",
  userController.getCurrentUserV2
);

export default router;
