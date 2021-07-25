import { handler } from "../services/pre-request-handler";
import { SongService } from "../services/song.service";

const createSong = handler(async (req, res, next,logger) => {
  
  const song = await SongService().createSong(req);

  return song;
});

const getSongs = handler(async () => {
  const songs = await SongService().getSongs();
  return songs;
});

const deleteSong = handler(async (req) => {
  
 const response = await SongService().deleteSong(req);
 return response
});
const SongController = {
  createSong,
  getSongs,
  deleteSong,
};

export { SongController };
