import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import moment from "moment";

const SongService = () => {
   const model = MODELS.SONG;
  const createSong = async (req) => {
    
    const { id, name, image, description } = req.body;
    var data = {
      id,
      name,
      image,
      description,
      pdatedDateTime: moment(new Date()),
    };

    if (!id) {
      data = { ...data, createdDateTime: moment(new Date()) };
    }

    const createdSong = await Repository.upsert(model, data);

    return createdSong[0];
  };

  const getSongs = async (req) =>{
    const songs = await Repository
  }

  return {
    createSong,
  };
};

export { SongService };
