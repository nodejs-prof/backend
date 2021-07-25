import { GeneralError } from "./exceptions/GeneralError";
import { HttpClient } from "./http_client";

const PushNotificationManager = (logger) => {
  const httpClient = HttpClient();

  const FIREBASE = JSON.parse(process.env.FIREBASE);
  const PUSH_NOTIFICATION_ENV = FIREBASE.PUSH_NOTIFICATION;

  const send = async (to, msgbody, title, data) => {
    const url = PUSH_NOTIFICATION_ENV.BASE_URL;
    const header = {
      Authorization: `key=${PUSH_NOTIFICATION_ENV.SERVER_KEY}`,
    };
    const body = {
      to,
      notification: {
        title,
        body: msgbody,
        image: PUSH_NOTIFICATION_ENV.NOTIFICATION_IMAGE,
      },
    };

    const result = await httpClient.post({ url, headers: header, body });

    if (result.failure === 1) {
      throw new GeneralError(500, JSON.stringify(result));
    }

    return result;
  };

  return { send };
};

export { PushNotificationManager };
