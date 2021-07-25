import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { SEVERITY } from "../shared/logger";
import { Repository } from "./repository";

const SongRepository = (logger) => {
  const songModel = MODELS.SONG;

  const create = async (data) => {
    // logger.log(SEVERITY.INFO, "Started creating the song");
    try {
      const result = await Repository.create(songModel, data);
      return result;
    } catch (error) {
      throw new GeneralError(500, "Error Occured in creating record");
    }
  };

  const getAllSongs = async () => {
    try {
      const response = await Repository.findAll(songModel);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error occured in getting songs");
    }
  };

  const deleteSong = async (id) => {
    try {
      const response = await Repository.deleteItem(songModel, id);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error occured in deleting song");
    }
  };

  return { create, getAllSongs, deleteSong };
};

export { SongRepository };
