import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { Repository } from "./repository";

const PartRepository = () => {
  const partModel = MODELS.PART;
  const create = async (part) => {
    try {
      const response = await Repository.upsert(partModel, part);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error in creating a part");
    }
  };

  const getAll = async () => {
    try {
      const response = await Repository.findAll(partModel);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error in getting all parts");
    }
  };

  const getByID = async (id) => {
    try {
      const response = await Repository.findById(partModel, id);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error in getting a part by ID");
    }
  };

  const getBySongID = async (songId) => {
    try {
      const response = await partModel.findOne({ where: { songId } });
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error in getting a part by song ID");
    }
  };

  const deletePart = async (id) => {
    try {
      const response = await Repository.deleteItem(partModel, id);
      return response;
    } catch (error) {
      throw new GeneralError(500, "Error in deleting a part by ID");
    }
  };

  return {
    create,
    getAll,
    getByID,
    deletePart,
    getBySongID,
  };
};

export { PartRepository };
