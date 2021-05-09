// import { auditMethod } from "../shared/user_audits";

import { MODELS } from "../models";
import { Repository } from "../repositories/repository";

const registerUser = async (req) => {
  const model = MODELS.USER;
  const body = req.body;
  const { name, email } = body;
  const request = {
    name,
    email
  }
  return await Repository.create(model, request);
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
