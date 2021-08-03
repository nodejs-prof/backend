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

  const findByNotificationIdIncludeUsers = async (id) => {
    try {
      return await MODELS.Notification.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: MODELS.User_Notification,
            as: "user_notifications",
            include: [
              {
                model: MODELS.USER,
                as: "user",
              },
            ],
          },
        ],
      });
    } catch (error) {
      logger.log(
        SEVERITY.ERROR,
        "Error occured in getting user notification by id"
      );
      logger.log(SEVERITY.ERROR, error);

      throw new BadRequestException(
        "Error occured in getting user notification by id"
      );
    }
  };

  return { create, findByNotificationIdIncludeUsers };
};

export { NotificationRepository };
