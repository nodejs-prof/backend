import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { SEVERITY } from "../shared/logger";
import { Repository } from "./repository";

const EventRepository = (logger) => {
  const create = async (data) => {
    try {
      return await Repository.upsert(MODELS.EVENT, data);
    } catch (error) {
      logger.log(SEVERITY.ERROR, "error occured in creating event");
      logger.log(SEVERITY.error, error);
      throw new GeneralError("Create event fails");
    }
  };

  const findBy = async (fileds) => {
    try {
      return await MODELS.EVENT.findOne({ where: { ...fileds } });
    } catch (error) {
      logger.log(
        SEVERITY.ERROR,
        "error ouucured in find event by fields " + JSON.stringify(fileds)
      );
      logger.log(SEVERITY.ERROR, error);
      throw new GeneralError("error occured in finding events");
    }
  };

  const findAll = async (pagination) => {
    const { page, size } = pagination;

    return MODELS.EVENT.findAll({
      offset: page * size,
      limit: size,
      order: [["updatedAt", "DESC"]],
    });
  };

  const deleteById = async (id) => {
    try {
      const response = await Repository.deleteItem(MODELS.EVENT, id);
      return response;
    } catch (error) {
      logger.log(`Error occured in deleting event by id : ${id}`);
      logger.log(error);
      throw new GeneralError(500, "Error occured in deleting event");
    }
  };

  return { create, findBy, findAll, deleteById };
};

export { EventRepository };
