import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { Repository } from "./repository";

const PartRepository = () => {
  const partModel = MODELS.PART;
  const create = async (part, t) => {
    try {
      const response = await Repository.upsertWithTransaction(
        partModel,
        part,
        t
      );
      return response;
    } catch (error) {
      // console.log("*****************");
      // console.log(error);
      throw new GeneralError(500, "Error in creating a part");
    }
  };

  const getByID = async (id) => {
    try {
      const dbResult = await partModel.findOne({
        where: { id },
        include: [
          {
            model: MODELS.USER_PART,
            as: "part_user",
            required: true,
            include: [
              {
                model: MODELS.USER,
                as: "user",
                required: true,
              },
            ],
          },
        ],
      });
      return dbResult;
    } catch (error) {
      throw new GeneralError(500, "Error in getting a part by ID");
    }
  };

  const getBySongID = async (songId) => {
    try {
      const dbResult = await partModel.findAll({
        where: { songId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: MODELS.USER_PART,
            as: "part_user",
            required: true,
            include: [
              {
                model: MODELS.USER,
                as: "user",
                required: true,
              },
            ],
          },
        ],
      });
      return dbResult;
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
    getByID,
    deletePart,
    getBySongID,
  };
};

export { PartRepository };
