import { auditMethod } from "../shared/user_audits";

// @auditMethod()

class Userservice {
  @auditMethod
  registerUser() {
    console.log("user registered");
  }
}

export { Userservice };
