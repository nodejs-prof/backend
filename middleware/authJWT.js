import { Forbiddenexception } from "../shared/exceptions/ForbiddenException";
import jwt from "jsonwebtoken";
import { secretCode } from "../config/auth.config";
import { UnauthorizedException } from "../shared/exceptions/UnauthorizedException";

const authorize = ({ roles = [] }) => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    // console.log("I am at authorise");
    if (!token) {
      return next(new Forbiddenexception("Token not found"));
    }

    const decoded = await verification(token, next);

    validateRoles(roles, decoded.roles);

    return next();
  };
};

const validateRoles = (expectedRoles = [], userRoles = []) => {
  if (expectedRoles.length === 0) {
    return;
  }
};

const verification = async (token, next) => {
  return jwt.verify(token, secretCode.secret, (err, decoded) => {
    if (err) {
      return next(new UnauthorizedException("Unauthorized user!"));
    }

    return {
      email: decoded.email,
      roles: decoded.roles,
    };
    // req.email = decoded.email;
    // return next();
  });
};

// const verificationCb = async (req, res, next) => {
//   return (err, decoded) => {
//     if (err) {
//       throw new UnauthorizedException("Unauthorized user!");
//     }
//     // req.email = decoded.email;
//     next();
//   };
// };

const AuthJWTFilter = {
  authorize,
};

export { AuthJWTFilter };
