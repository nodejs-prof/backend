import { Router } from "express";
import { PartController } from "../controller/part.controller";

var router = Router();

router.post("/create", PartController.create);
router.get("/get-one-by-id/:partId", PartController.getPartByID);
router.get("/get-parts-by-songid/:id", PartController.getPartsBySongID);
router.delete("/delete/:id", PartController.deletePartByID);

export default router;
