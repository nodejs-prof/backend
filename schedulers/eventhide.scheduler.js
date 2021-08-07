import moment from "moment";
import { scheduleJob } from "node-schedule";
import { EventService } from "../services/event.service";
import { getPNAdapter } from "../services/pushnotification/pnadapter";
import { UserNotificationService } from "../services/user.notification.service";

const job = scheduleJob("*/25 * * * * *", async () => {
  const format2 = "YYYY-MM-DD HH:mm:ss";
  console.log("Event hiding Schedular starts");
  const res = await EventService().updateEventWithHide();
  console.log(res);
  if (res) {
    console.log("updated the event hiding");
  }

  //   for (const item of dbresult) {
  //     const adapter = getPNAdapter(item.type)();

  //     await adapter.push(item);
  //   }
});
