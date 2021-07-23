import { Router } from "express";
import { NoificationController } from "../controller/notification.controller";
import { userController } from "../controller/user.controller";
import { AuthJWTFilter } from "../middleware/authJWT";

var router = Router();

router.post("/create", AuthJWTFilter.authorize(), NoificationController.create);

router.get("/:id", AuthJWTFilter.authorize(), NoificationController.view);

router.get(
  "/all",
  AuthJWTFilter.authorize(),
  NoificationController.getAllUserNotification
);

router.get(
  "/unseen-count",
  AuthJWTFilter.authorize(),
  NoificationController.getUserUnSeenNotificationsCount
);

router.put(
  "/seen-all",
  AuthJWTFilter.authorize(),
  NoificationController.seenAllUserNotifications
);

export default router;
