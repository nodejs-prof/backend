import { PushNotificationManager } from "../../shared/pushnotification_manager";
import { UserNotificationService } from "../user.notification.service";

const AdminCreatedPNAdapter = (logger) => {
  const pnManager = PushNotificationManager();
  const userNotificationService = UserNotificationService();

  const push = async (data) => {
    console.log("---------- sending push notification -----------------");

    const { user, notification } = data;

    if (
      !(
        user &&
        user.device_token &&
        user.device_token.length &&
        user.device_token.length > 0
      )
    ) {
      console.log("user has no device");
      return;
    }

    let dbRecord = {
      id: data.id,
    };

    for (const token of user.device_token) {
      const to = token.deviceToken;

      try {
        console.log("Sending PN : ");
        const result = await pnManager.send(
          to,
          notification.topic,
          "Vocal Avenue"
        );
        console.log(result);
        dbRecord = {
          ...dbRecord,
          status: "SUCCESS",
        };
      } catch (error) {
        dbRecord = {
          ...dbRecord,
          status: "FAIL",
          cause: JSON.stringify(error),
        };
      }
      dbRecord = { ...dbRecord, pnSend: true };

      await userNotificationService.updatePNSendStatus(dbRecord);
    }
  };

  return { push };
};

export { AdminCreatedPNAdapter };
