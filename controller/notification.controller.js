import { NotificationService } from "../services/notification.service";
import { handlerWithCurrentUser } from "../services/pre-request-handler";
import { UserNotificationService } from "../services/user.notification.service";
import { SEVERITY } from "../shared/logger";
import { getPagination } from "../shared/utility";

const create = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to create noification");

    const requestBody = req.body;

    const service = NotificationService(logger);

    const result = await service.create(requestBody);

    return result;
  }
);

const getAllUserNotification = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to get All user noification");

    const pagination = getPagination(req);

    const service = UserNotificationService(logger);

    const result = await service.getUserNotifications(userDetails, pagination);

    return result;
  }
);

const getUserUnSeenNotificationsCount = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to get All unseen user noification");

    const service = UserNotificationService(logger);

    const result = await service.getUserUnSeenNotificationsCount(userDetails);

    return result;
  }
);

const seenAllUserNotifications = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to get All unseen user noification");

    const service = UserNotificationService(logger);

    const result = await service.seenAll(userDetails);

    return result;
  }
);

const view = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to view user noification");

    const { id: userNotificationId } = req.params;

    const service = UserNotificationService(logger);

    const result = await service.view(userDetails, userNotificationId);

    return result;
  }
);

const NoificationController = {
  create,
  getAllUserNotification,
  getUserUnSeenNotificationsCount,
  seenAllUserNotifications,
  view,
};

export { NoificationController };
