// import { auditMethod } from "../shared/user_audits";

import { getModel } from "../models";
import { Repository } from "../repositories/repository";

const registerUser = (req, res) => {
  Repository.create(getModel("user"), { ...req });
};

const Userservice = {
  registerUser,
};

// @auditMethod()

// class Userservice {

//   constructor(logger){
//     this.logger = logger;
//   }

//   @auditMethod
//   registerUser() {
//     console.log("user registered");
//   }
// }

export { Userservice };
