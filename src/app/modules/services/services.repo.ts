import { FindManyOptions, FindOneOptions } from "typeorm";

import { handler } from "../../../app/config/dbconfig";
import { Services } from "./entities/services.entity";
import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";

const repository = async () => {
  const dataSource = await handler();
  const repo = dataSource.getRepository(Services);
  //1. find all records
  const find = async (option?: FindManyOptions<Services>) => {
    try {
      return await repo.find(option);
    } catch (error) {
      throw error;
    }
  };

  //2. find single record with options
  const findOne = async (option?: FindOneOptions<Services>) => {
    try {
      return await repo.find(option);
    } catch (error) {
      throw error;
    }
  };

  //3. find single records by id
  const findOneById = async (id: number, filter?: FindOneOptions<Services>) => {
    try {
      const item = await repo.findOne({
        select: {
          ...filter?.select,
        },
        where: {
          id: Number(id),
          ...filter?.where,
        },
        relations: {
          ...filter?.relations,
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
  const create = async (data: Services) => {
    try {
      //
      let respo = new Services();
      if (!data.isService) {
        const itv = new ItemAvailable();
        itv.modifiedDate = data.modifiedDate;
        itv.quantity = 0;

        await dataSource.manager.transaction(
          "SERIALIZABLE",
          async (transactionalEntityManager) => {
            const item = transactionalEntityManager.create(Services, data);
            const itemResult = await transactionalEntityManager.save(
              Services,
              item
            );
            const itemAvalableEntry = transactionalEntityManager.create(
              ItemAvailable,
              {
                ...itv,
                service: itemResult,
              }
            );
            const insTocksaved = await transactionalEntityManager.save(
              ItemAvailable,
              itemAvalableEntry
            );
            await transactionalEntityManager.save(Services, {
              ...itemResult,
              inStock: insTocksaved,
            });
            respo = itemResult;
          }
        );
      } else {
        const itemResult = repo.create(data);
        respo = await repo.save(itemResult);
      }

      return respo;
    } catch (error) {
      throw error;
    }
  };

  //4. update single records
  const updateById = async (id: number, data: Services) => {
    try {
      const respo = await repo.findOneBy({
        id: id,
      });
      if (!respo) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      await repo.save({
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
      const respo = await repo.findOneBy({
        id: id,
      });
      if (!respo) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      await repo.remove(respo);
    } catch (error) {
      throw error;
    }
  };

  //6. create multiple records
  const createAll = async (data: Services[]) => {
    try {
      const respo = repo.create(data);
      await repo.save(respo);
      return respo;
    } catch (error) {
      throw error;
    }
  };
  //6. create multiple records
  const createBulk = async (data: Services[]) => {
    try {
      const respo = repo.create(data);
      await repo.save(respo);
      await dataSource.transaction(async (transactionalEntityManager) => {
        // execute queries using transactionalEntityManager
        // 1. generate header entry code
        //2. update or add main header based on id
      });
      return respo;
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
