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
    const dbResult = await SongRepository().getAllSongs();
    const response = dbResult.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      createdDateTime: item.createdDateTime,
    }));
    return response;
  };

  const deleteSong = async (req) => {
    const { id } = req.params;
    await SongRepository().deleteSong(id);
    return { message: "Song successfully deleted" };
  };

  return {
    createSong,
    getSongs,
    deleteSong,
  };
};

export { SongService };
