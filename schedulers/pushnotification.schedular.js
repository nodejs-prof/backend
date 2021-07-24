import { scheduleJob } from "node-schedule";
import { getPNAdapter } from "../services/pushnotification/pnadapter";
import { UserNotificationService } from "../services/user.notification.service";

const job = scheduleJob("*/15 * * * * *", async () => {
  console.log("schedular starts");
  const dbresult = await UserNotificationService().getAllPnSendFalseRecords();

  for (const item of dbresult) {
    const adapter = getPNAdapter(item.type)();

    await adapter.push(item);
  }
});
