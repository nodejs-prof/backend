import { handler } from "../services/pre-request-handler";
import { SongService } from "../services/song.service";

const createSong = handler(async (req, res, next) => {
  const song = await SongService().createSong(req);

  return song;
});

const SongController = {
  createSong,
};

export { SongController };
