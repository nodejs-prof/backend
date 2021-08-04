import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import moment from "moment";
import { SongRepository } from "../repositories/song.repository";
import { handler } from "./pre-request-handler";
import { NotFoundException } from "../shared/exceptions/NotFoundException";

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

  const getSongs = async (pagination) => {
    const dbResult = await SongRepository().getAllSongs(pagination);
    const response = dbResult.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      updatedAt: item.updatedAt,
    }));
    return response;
  };

  const getSongsbyId = async (id) => {
    const dbResult = await SongRepository().getSongsbyId(id);

    if (!dbResult) {
      throw new NotFoundException(`Song not for id : ${id}`);
    }

    const response = {
      id: dbResult.id,
      name: dbResult.name,
      image: dbResult.image,
      description: dbResult.description,
      updatedAt: dbResult.updatedAt,
    };
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
    getSongsbyId,
  };
};

export { SongService };
