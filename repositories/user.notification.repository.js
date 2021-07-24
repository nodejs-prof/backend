import { Repository } from "./repository";
import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { SEVERITY } from "../shared/logger";

const UserNotificationRepository = (logger) => {
  const create = async (data) => {
    try {
      const result = await Repository.create(MODELS.User_Notification, data);

      return result;
    } catch (error) {
      console.log(error);
      throw new GeneralError(500, "Error Occured in creating record");
    }
  };

  const findByNotificationId = async (id) => {
    console.log(`----------- id ---> ${id}`);
    const result = await MODELS.User_Notification.findAll({
      where: {
        notificationId: id,
      },
    });

    return result;
  };

  const deleteById = async (id) => {
    const result = await MODELS.User_Notification.destroy({
      where: { id: id },
    });

    return result;
  };

  const findAllByUserId = async (id, pagination) => {
    const { page, size } = pagination;
    const skip = page * size;

    try {
      return await MODELS.User_Notification.findAll({
        where: {
          userId: id,
        },
        offset: skip,
        limit: size,
        include: [
          {
            model: MODELS.Notification,
            as: "notification",
          },
        ],
        order: [[MODELS.Notification, "lastUpdatedDateTime", "DESC"]],
      });
    } catch (error) {
      logger.log(
        SEVERITY.ERROR,
        "Error occured in find notifications by user id"
      );
      logger.log(SEVERITY.ERROR, error);

      throw new BadRequestException(
        "Error occured in getting user notifications"
      );
    }
  };

  const findAllByUserIdAndSeen = async (id, seen) => {
    const result = await MODELS.User_Notification.findAll({
      where: {
        userId: id,
        seen: seen,
      },
    });

    return result;
  };

  const updateAsSeenbyUserId = async (id) => {
    const result = await MODELS.User_Notification.update(
      {
        seen: true,
      },
      {
        where: { userId: id },
      }
    );

    return result;
  };

  const findByUserNotificationId = async (id) => {
    try {
      return await MODELS.User_Notification.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: MODELS.Notification,
            as: "notification",
          },
        ],
      });
    } catch (error) {
      logger.log(
        SEVERITY.ERROR,
        "Error occured in find notifications by user-notification id"
      );
      logger.log(SEVERITY.ERROR, error);

      throw new BadRequestException(
        "Error occured in getting user notification"
      );
    }
  };
  

  return {
    create,
    findByNotificationId,
    deleteById,
    findAllByUserId,
    findAllByUserIdAndSeen,
    updateAsSeenbyUserId,
    findByUserNotificationId,
  };
};

export { UserNotificationRepository };
