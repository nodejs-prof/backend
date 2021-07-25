import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import moment from "moment";
import { SongRepository } from "../repositories/song.repository";
import { handler } from "./pre-request-handler";

const SongService = () => {
  const model = MODELS.SONG;

  const createSong = async (req) => {
    const { id, name, image, description } = req.body;
    var data = {
      id,
      name,
      image,
      description,
      updatedDateTime: moment(new Date()),
    };

    if (!id) {
      data = { ...data, createdDateTime: moment(new Date()) };
    }

    const createdSong = await Repository.upsert(model, data);

    return createdSong[0];
  };

  const getSongs = async () => {
    const songs = await SongRepository().getAllSongs();
    return songs;
  };

  const deleteSong = async (req) => {
    const { id } = req.params;
    const song = await SongRepository().deleteSong(id);
    return song;
  };

  return {
    createSong,
    getSongs,
    deleteSong,
  };
};

export { SongService };
