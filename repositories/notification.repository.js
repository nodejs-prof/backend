import { Repository } from "./repository";
import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";

const NotificationRepository = (logger) => {
  const create = async (data, t) => {
    try {
      const result = await Repository.createWithTransaction(
        MODELS.Notification,
        data,
        t
      );

      return result;
    } catch (error) {
      throw new GeneralError(500, "Error Occured in creating record");
    }
  };

  return { create };
};

export { NotificationRepository };
