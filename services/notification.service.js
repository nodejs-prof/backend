import { NotificationRepository } from "../repositories/notification.repository";
import moment from "moment";
import { UserNotificationRepository } from "../repositories/user.notification.repository";
import { UserNotificationService } from "./user.notification.service";

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

    const [result, ...rest] = await notificationRepository.create(data);

    const { id: notificationId } = result;

    await userNotificationService.create(notificationId, assignees);

    return result;
  };



  const getUserNotifications = (user) => {

    
  }

  return { create };
};

export { NotificationService };
