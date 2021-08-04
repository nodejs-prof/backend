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

  const getAllSongs = async (pagination) => {
    const { page, size } = pagination;
    const skip = page * size;

    try {
      const dbResult = await songModel.findAll({
        order: [["updatedAt", "DESC"]],
        offset: skip,
        limit: size,
      });

      return dbResult;
    } catch (error) {
      console.log(error);
      throw new GeneralError(500, "Error occured in getting songs");
    }
  };

  const getSongsbyId = async (id) => {
    try {
      const dbResult = await songModel.findOne({
        where: { id },
      });

      return dbResult;
    } catch (error) {
      console.log(error);
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

  return { create, getAllSongs, deleteSong, getSongsbyId };
};

export { SongRepository };
