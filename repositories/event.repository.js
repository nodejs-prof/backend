import moment from "moment";
import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { SEVERITY } from "../shared/logger";
import { Repository } from "./repository";
const { Op } = require("sequelize");

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

  const findAll = async (pagination, isHidden = false) => {
    const { page, size } = pagination;

    return MODELS.EVENT.findAll({
      where: {
        isHidden,
      },
      offset: page * size,
      limit: size,
      order: [["updatedAt", "DESC"]],
    });
  };

  const findAllASCEventDate = async (pagination, isHidden = false) => {
    const { page, size } = pagination;

    return MODELS.EVENT.findAll({
      where: {
        isHidden,
      },
      offset: page * size,
      limit: size,
      order: [["eventAt", "ASC"]],
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

  const hideEvents = async () => {
    const format2 = "YYYY-MM-DD HH:mm:ss";
    const d = moment(new Date().toISOString())
      .utcOffset("+0530")
      .format(format2);
    console.log(d);
    try {
      return await MODELS.EVENT.update(
        {
          isHidden: true,
          hiddenDate: d,
        },
        {
          where: {
            isHidden: false,
            eventAt: {
              [Op.lt]: d,
            },
          },
        }
      );
    } catch (error) {
      console.log("Error occured when hiding old events");
      console.log(error);
      throw new GeneralError(500, "Error occured when hiding old events");
    }
  };

  const getByDate = async () => {
    try {
      return await MODELS.EVENT.findAll({
        where: {
          eventAt: {
            [Op.lt]: moment().toDate(),
          },
        },
      });
    } catch (error) {
      console.log("Error occured when getting old events");
      console.log(error);
      throw new GeneralError(500, "Error occured when getting old events");
    }
  };

  return {
    create,
    findBy,
    findAll,
    deleteById,
    hideEvents,
    getByDate,
    findAllASCEventDate,
  };
};

export { EventRepository };
