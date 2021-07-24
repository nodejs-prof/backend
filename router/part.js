import { Router } from "express";
import { PartController } from "../controller/part.controller";

var router = Router();

router.post("/create", PartController.create);
router.get("/all", PartController.getAllParts);
router.get("/get-one-by-id/:id", PartController.getPartByID);
router.get("/get-one-by-songid/:id", PartController.getPartByID);
router.delete("/delete/:id", PartController.deletePartByID);

export default router;
