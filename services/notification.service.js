import { NotificationRepository } from "../repositories/notification.repository";
import moment from "moment";
import { UserNotificationRepository } from "../repositories/user.notification.repository";
import { UserNotificationService } from "./user.notification.service";
import { Repository } from "../repositories/repository";

const NotificationService = (logger) => {
  const notificationRepository = NotificationRepository(logger);
  const userNotificationService = UserNotificationService(logger);

  const create = async (body) => {
    const { id, topic, description, assignees, all } = body;

    let data = {
      topic,
      description,
      lastUpdatedDateTime: moment().format(),
    };

    if (id) {
      data = { ...data, id };
    } else {
      data = { ...data, createdDateTime: moment().format() };
    }

    const result = await Repository.HandleTransaction(async (t) => {
      const [result, ...rest] = await notificationRepository.create(data, t);

      const { id: notificationId } = result;

      await userNotificationService.create(notificationId, assignees, false, t);

      return result;
    });
    return result;
  };

  const view = async (user, notificationID) => {
    // const { id } = user;

    const dbresult =
      await notificationRepository.findByNotificationIdIncludeUsers(
        parseInt(notificationID)
      );

    if (!dbresult) {
      throw new NotFoundException(
        `cannot find notification for id : ${userNotificationId}`
      );
    }

    const { id, topic, description, createdAt, user_notifications } = dbresult;
    const assignees = user_notifications.map((item) => ({
      unID: item.id,
      userID: item.user.id,
      name: item.user.name,
      image: item.user.image,
    }));

    const result = {
      id,
      topic,
      description,
      createdAt,
      assignees,
    };

    return result;
  };

  return { create, view };
};

export { NotificationService };
