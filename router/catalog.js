import { Router } from "express";
import { authorController } from "../controller/author_controller";

var router = Router();

router.get("/author/create", authorController.author_list);

export default router;
