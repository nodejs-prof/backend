// import { auditMethod } from "../shared/user_audits";

import { NotFoundException } from "../shared/exceptions/NotFoundException";

const registerUser = () => {
  // console.log("user registered !!!!!!!!!!!");
  throw new NotFoundException("NOT IMPLEMENTED: Author list !!!!!!!!!!!!!!")
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
