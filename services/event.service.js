import moment from "moment";
import { EventRepository } from "../repositories/event.repository";
import { NotFoundException } from "../shared/exceptions/NotFoundException";

const EventService = (logger) => {
  const eventRepository = EventRepository(logger);

  const create = async (body) => {
    const { id, image, title, desc, eventAt, arrivalAt, type, link } = body;

    let data = {
      image,
      title,
      desc,
      eventAt,
      arrivalAt,
      type,
      link,
      isHidden: false,
    };
    if (id) {
      data = { ...data, id };
    }

    const result = await eventRepository.create(data);
    return result;
  };

  const getEventById = async (id) => {
    const result = await eventRepository.findBy({ id });

    if (!result) {
      throw new NotFoundException(`cannot find event for id : ${id}`);
    }

    return result;
  };

  const getAllEvents = async (pagination) => {
    const result = await eventRepository.findAll(pagination);

    return result;
  };

  const deleteById = async (id) => {
    await eventRepository.deleteById(id);

    return { message: `successfully deleted event id : ${id}` };
  };

  const updateEventWithHide = async (date) => {
    console.log(date);
    const res = await eventRepository.hideEvents(date);
    console.log("*********************************************");
    console.log(res);
    return res;
  };

  const getEventsByDate = async (date) => {
    console.log(moment().toDate());
    const res = await eventRepository.getByDate(date);
    console.log("*********************************************");
    console.log(res);
    return res;
  };

  return {
    create,
    getEventById,
    getAllEvents,
    deleteById,
    updateEventWithHide,
    getEventsByDate,
  };
};

export { EventService };
