import moment from "moment";
import { PartRepository } from "../repositories/part.repository";
import { Repository } from "../repositories/repository";
import { UserPartRepository } from "../repositories/user.part.respository";
import { NotFoundException } from "../shared/exceptions/NotFoundException";
import { getPartCategory } from "../shared/utility";

const PartService = () => {
  const createPart = async (req) => {
    const {
      id,
      name,
      description,
      category,
      audioURL,
      sheetURL,
      lyrics,
      songId,
      assignees = [],
    } = req.body;

    let data = {
      name,
      description,
      category: getPartCategory(category),
      audioURL,
      sheetURL,
      lyrics,
      songId,
    };

    if (id) {
      data = { ...data, id };
    }

    const response = await Repository.HandleTransaction(async (t) => {
      const [part, ...rest] = await PartRepository().create(data, t);
      const { id: partId } = part;

      await UserPartRepository().deleteUserPart(partId);

      for (const userId of assignees) {
        await UserPartRepository().create(userId, partId, t);
      }

      return part;
    });

    return response;
  };

  const getPartById = async (id) => {
    const result = await PartRepository().getByID(id);
    if (!result) {
      throw new NotFoundException(`No part by id ${id}`);
    }

    const {
      name,
      description,
      category,
      audioURL,
      sheetURL,
      lyrics,
      createdAt,
      songId,
      part_user,
    } = result;

    const assignees = part_user.map((item) => {
      const { user } = item;
      return {
        id: user.id,
        name: user.name,
        image: user.image,
      };
    });

    return {
      id,
      name,
      description,
      category,
      audioURL,
      sheetURL,
      lyrics,
      createdAt,
      songId,
      assignees,
    };
  };

  const getPartBySongId = async (songID) => {
    const result = await PartRepository().getBySongID(songID);

    if (!result) {
      return [];
    }

    const response = result.map((part) => {
      let partItem = {
        id: part.id,
        name: part.name,
        createdAt: part.createdAt,
      };
      const { part_user } = part;
      partItem.assignees = part_user.map((item) => {
        const { user } = item;
        return {
          id: user.id,
          name: user.name,
          image: user.image,
        };
      });

      return partItem;
    });

    return response;
  };

  const deletePart = async (req) => {
    const { id } = req.params;
    await PartRepository().deletePart(id);
    return { message: "Successfully deleted" };
  };

  return {
    createPart,
    getPartById,
    getPartBySongId,
    deletePart,
  };
};

export { PartService };
