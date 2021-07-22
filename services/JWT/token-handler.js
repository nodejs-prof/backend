import jwt from "jsonwebtoken";
import { secretCode } from "./../../config/auth.config";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

const generateToken = async (userData) => {
  const token = await jwt.sign(userData, secretCode.secret, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

const decodeToken = async (token) => {
  try {
    const tokenDecoded = jwt.verify(token, secretCode.secret);
    return tokenDecoded;
  } catch (error) {
    throw new BadRequestException("Invalid Token or secret");
  }
};

const TokenHandler = { generateToken, decodeToken };

export { TokenHandler };
