import moment from "moment";
import { scheduleJob, RecurrenceRule } from "node-schedule";
import { EventService } from "../services/event.service";
import { getPNAdapter } from "../services/pushnotification/pnadapter";
import { UserNotificationService } from "../services/user.notification.service";

// const rule = new RecurrenceRule();
// rule.hour = 11;
// rule.minute = 15;
// rule.tz = "Etc/UTC";

const job = scheduleJob({ hour: 19, minute: 30, tz: "Etc/UTC" }, async () => {
  const format2 = "YYYY-MM-DD HH:mm:ss";
  console.log("Event hiding Schedular starts");
  const res = await EventService().updateEventWithHide();
  console.log(res);
  if (res) {
    console.log("updated the event hiding");
  }
});
