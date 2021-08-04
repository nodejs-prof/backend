import { Router } from "express";
import { SongController } from "../controller/song.controller";

var router = Router();

router.post("/create", SongController.createSong);
router.get("/all-songs", SongController.getSongs);
router.get("/view/:id", SongController.getSongsbyId);
router.delete("/delete/:id", SongController.deleteSong);

export default router;
