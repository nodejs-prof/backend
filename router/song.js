import { Router } from "express";
import { SongController } from "../controller/song.controller";

var router = Router();

router.post("/create", SongController.createSong);

export default router;
