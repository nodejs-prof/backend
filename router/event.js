import { Router } from "express";
import { EventController } from "../controller/event.controller";

var router = Router();

router.post("/create", EventController.create);
router.get("/view/:id", EventController.getById);
router.get("/all", EventController.getAll);
router.get("/all-visible", EventController.getAllSortedByEvent);
router.delete("/delete/:id", EventController.deleteById);

export default router;
