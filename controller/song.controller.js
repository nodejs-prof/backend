import { handler } from "../services/pre-request-handler";
import { SongService } from "../services/song.service";
import { getPagination } from "../shared/utility";

const createSong = handler(async (req, res, next, logger) => {
  const song = await SongService().createSong(req);

  return song;
});

const getSongs = handler(async (req) => {
  const pagination = getPagination(req);

  const songs = await SongService().getSongs(pagination);
  return songs;
});

const getSongsbyId = handler(async (req) => {
  const { id } = req.params;

  const songs = await SongService().getSongsbyId(id);
  return songs;
});

const deleteSong = handler(async (req) => {
  const response = await SongService().deleteSong(req);
  return response;
});
const SongController = {
  createSong,
  getSongs,
  deleteSong,
  getSongsbyId,
};

export { SongController };
