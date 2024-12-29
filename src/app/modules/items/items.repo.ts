import { FindManyOptions, FindOneOptions } from "typeorm";

import { handler } from "../../../app/config/dbconfig";
import { Item } from "./entities/items.entity";

const repository = async () => {
  const dataSource = await handler();
  const itemRepository = dataSource.getRepository(Item);
  //1. find all records
  const find = async (option?: FindManyOptions<Item>) => {
    try {
      return await itemRepository.find(option);
    } catch (error) {
      throw error;
    }
  };

  //2. find single record with options
  const findOne = async (option?: FindOneOptions<Item>) => {
    try {
      return await itemRepository.find(option);
    } catch (error) {
      throw error;
    }
  };

  //3. find single records by id
  const findOneById = async (id: number) => {
    try {
      const item = await itemRepository.findOne({
        where: {
          id: Number(id),
        },
        relations: {
          itemDescription: true,
          itemImage: true,
        },
      });
      if (!item) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      return item;
    } catch (error) {
      throw error;
    }
  };

  //4. create single record
  const create = async (data: Item) => {
    try {
      const items = itemRepository.create(data);
      await itemRepository.save(items);
      return items;
    } catch (error) {
      throw error;
    }
  };

  //4. update single records
  const updateById = async (id: number, data: Item) => {
    try {
      const respo = await itemRepository.findOneBy({
        id: id,
      });
      if (!respo) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      await itemRepository.save({
        ...respo,
        ...data,
      });
    } catch (error) {
      throw error;
    }
  };

  //5. delete single record
  const deleteById = async (id: number): Promise<void> => {
    try {
      const item = await itemRepository.findOneBy({
        id: id,
      });
      if (!item) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      await itemRepository.remove(item);
    } catch (error) {
      throw error;
    }
  };

  //6. create multiple records
  const createAll = async (data: Item[]) => {
    try {
      const items = itemRepository.create(data);
      await itemRepository.save(items);
      return items;
    } catch (error) {
      throw error;
    }
  };
  //6. create multiple records
  const createBulk = async (data: Item[]) => {
    try {
      const items = itemRepository.create(data);
      await itemRepository.save(items);
      await dataSource.transaction(async (transactionalEntityManager) => {
        // execute queries using transactionalEntityManager
        // 1. generate header entry code
        //2. update or add main header based on id
        //2.
      });
      return items;
    } catch (error) {
      throw error;
    }
  };
  return {
    find,
    findOne,
    findOneById,
    create,
    updateById,
    deleteById,
    createAll,
  };
};

// Exporting an async function that resolves to an object containing find and findOne
export default repository;
