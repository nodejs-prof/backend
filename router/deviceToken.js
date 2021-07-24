import { Router } from "express";
import { DeviceTokenController } from "../controller/device_token.controller";


var router = Router();

router.post("/create", DeviceTokenController.create);

export default router;
