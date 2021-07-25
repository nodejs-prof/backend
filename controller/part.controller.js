import { PartService } from "../services/part.service";
import { handler } from "../services/pre-request-handler";

const create = handler(async (req) => {
  const response = await PartService().createPart(req);
  return response;
});


const getPartByID = handler(async (req) => {
  const { id } = req.params;
  const response = await PartService().getPartById(id);
  return response;
});

const getPartsBySongID = handler(async (req) => {
  const {id} = req.params;
  const response = await PartService().getPartBySongId(id);
  return response;
});

const deletePartByID = handler(async (req) => {
  const response = await PartService().deletePart(req);
  return response;
});


const PartController = {
  create,
  getPartByID,
  getPartsBySongID,
  deletePartByID,
};

export { PartController };
