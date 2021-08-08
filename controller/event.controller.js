import { EventService } from "../services/event.service";
import { handler } from "../services/pre-request-handler";
import { SEVERITY } from "../shared/logger";
import { getPagination } from "../shared/utility";

const create = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to create event");

  const { body } = req;

  const service = EventService(logger);
  const response = await service.create(body);
  return response;
});

const getById = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to get event by id");

  const { id } = req.params;

  const service = EventService(logger);
  const response = await service.getEventById(id);
  return response;
});

const getAll = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to get all events");

  const pagination = getPagination(req);

  const service = EventService(logger);
  const response = await service.getAllEvents(pagination);
  return response;
});

const getAllSortedByEventDate = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to get all events sorted by event Date");

  const pagination = getPagination(req);

  const service = EventService(logger);
  const response = await service.getAllEventsByAscEventDate(pagination);
  return response;
});

const deleteById = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to get delete events");

  const { id } = req.params;

  const service = EventService(logger);
  const response = await service.deleteById(id);
  return response;
});

const EventController = {
  create,
  getById,
  getAll,
  deleteById,
  getAllSortedByEventDate,
};

export { EventController };
