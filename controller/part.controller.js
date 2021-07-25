import { PartService } from "../services/part.service";
import { handler } from "../services/pre-request-handler";

const create = handler(async (req) => {
  const response = await PartService().createPart(req);
  return response;
});

const getAllParts = handler(async () => {
  const response = await PartService().getAllParts();
  return response;
});

const getPartByID = handler(async (req) => {
  const response = await PartService().getPartById(req);
  return response;
});

const getPartsBySongID = handler(async (req) => {
  const response = await PartService().getPartById(req);
  return response;
});

const deletePartByID = handler(async (req) => {
  const response = await PartService().deletePart(req);
  return response;
});

const hello = handler(async (req) => {
  const body = req?.body;
  if (body) {
    return { message: body };
  }
  return { message: "Body is not found" };
});

const PartController = {
  create,
  getAllParts,
  getPartByID,
  getPartsBySongID,
  deletePartByID,
  hello,
};

export { PartController };
