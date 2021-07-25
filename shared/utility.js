import { PART_CATEGORY } from "./constants";
import { BadRequestException } from "./exceptions/BadRequestException";
import { NotFoundException } from "./exceptions/NotFoundException";

export const tokenExtracter = (req) => {
  const token = req.header.authorization;
  return token;
};

export const getPagination = (req) => {
  const { page = 0, size = 20 } = req.query;

  return { page: parseInt(page), size: parseInt(size) };
};

export const getPartCategory = (category) => {
  if (Object.values(PART_CATEGORY).includes(category)) {
    return category;
  }

  throw new BadRequestException("Invalid Part category");
};
