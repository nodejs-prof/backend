import moment from "moment";
import { PartRepository } from "../repositories/part.repository";

const PartService = () => {
  const createPart = async (req) => {
    const {
      id,
      name,
      description,
      category,
      audioURL,
      sheetURL,
      lyrics,
      songId,
    } = req.body;

    let data = {
      id,
      name,
      description,
      category,
      audioURL,
      sheetURL,
      lyrics,
      songId,
      updatedDateTime: moment(new Date()),
    };

    if (!id) {
      data = { ...data, createdDateTime: moment(new Date()) };
    }
    const response = await PartRepository().create(data);
    return response[0];
  };

  const getAllParts = async () => {
    const response = await PartRepository().getAll();
    return response;
  };

  const getPartById = async (req) => {
    const { id } = req.params;
    const part = await PartRepository().getByID(id);
    return part;
  };

  const getPartBySongId = async (req) => {
    const { id } = req.params;
    const part = await PartRepository().getBySongID(id);
    return part;
  };

  const deletePart = async (req) => {
    const { id } = req.params;
    const response = await PartRepository().deletePart(id);
    return response;
  };

  return {
    createPart,
    getAllParts,
    getPartById,
    getPartBySongId,
    deletePart,
  };
};

export { PartService };
