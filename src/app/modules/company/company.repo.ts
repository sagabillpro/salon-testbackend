import { FindManyOptions, FindOneOptions } from "typeorm";

import { handler } from "../../../app/config/dbconfig";
import { Company } from "./entities/company.entity";
import { Branch } from "../branches/entities/branches.entity";

const repository = async () => {
  const dataSource = await handler();
  const repo = dataSource.getRepository(Company);
  //1. find all records
  const find = async (option?: FindManyOptions<Company>) => {
    try {
      return await repo.find(option);
    } catch (error) {
      throw error;
    }
  };

  //2. find single record with options
  const findOne = async (option?: FindOneOptions<Company>) => {
    try {
      return await repo.find(option);
    } catch (error) {
      throw error;
    }
  };

  //3. find single records by id
  const findOneById = async (id: number, filter?: FindOneOptions<Company>) => {
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
  const create = async (data: Company) => {
    try {
      const respo = repo.create(data);
      await repo.save(respo);
      return respo;
    } catch (error) {
      throw error;
    }
  };

  //4. update single records
  const updateById = async (id: number, data: Company) => {
    try {
      const respo = await repo.findOneBy({
        isInactive: 0,
      });
      if (!respo) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }
      await repo.save({
        ...respo,
        ...data,
        code: respo.code,
      });
    } catch (error) {
      throw error;
    }
  };

  //5. delete single record
  const deleteById = async (id: number): Promise<void> => {
    try {
      const branchRepo = dataSource.getRepository(Branch);
      const respo = await repo.findOne({
        where: { id: id },
        relations: ["branches"],
      });
      if (!respo) {
        throw { message: "Record not found with id: " + id, statusCode: 404 };
      }

      await repo.softRemove(respo);
      await branchRepo.update(
        {
          companyId: id,
        },
        {
          deletedAt: new Date(),
        }
      );
    } catch (error) {
      throw error;
    }
  };

  //6. create multiple records
  const createAll = async (data: Company[]) => {
    try {
      const respo = repo.create(data);
      await repo.save(respo);
      return respo;
    } catch (error) {
      throw error;
    }
  };
  //6. create multiple records
  const createBulk = async (data: Company[]) => {
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
