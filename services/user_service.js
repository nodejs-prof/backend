import { auditMethod } from "../shared/utils/UserAudits";

// @auditMethod()

class Userservice {
  @auditMethod
  registerUser() {
    console.log("user registered");
  }
}

export { Userservice };
