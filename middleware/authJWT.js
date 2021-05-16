import { Forbiddenexception } from "../shared/exceptions/ForbiddenException";
import jwt from "jsonwebtoken";
import { secretCode } from "../config/auth.config";
import { UnauthorizedException } from "../shared/exceptions/UnauthorizedException";

const authorize = (role) => {
  return (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new Forbiddenexception("Token not found");
    }

    jwt.verify(token, secretCode.secret, verificationCb(req,res,next));
  };
};

const verificationCb = (req, res, next) => {
  return (err, decoded) => {
    if (err) {
      throw new UnauthorizedException("Unauthorized user!");
    }
    // req.email = decoded.email;
    next();
  };
};

const AuthJWTFilter = {
  authorize,
};

export { AuthJWTFilter };
