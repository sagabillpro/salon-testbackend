import { FindManyOptions, FindOneOptions } from "typeorm";

import { handler } from "../../../app/config/dbconfig";

import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";
import { StockAdjustmentHeaders } from "./entities/stock-adjustment-headers.entity";

const repository = async () => {
  const dataSource = await handler();
  const repo = dataSource.getRepository(StockAdjustmentHeaders);
  //1. find all records
  const find = async (option?: FindManyOptions<StockAdjustmentHeaders>) => {
    try {
      return await repo.find(option);
    } catch (error) {
      throw error;
    }
  };

  //4. create single record
  const create = async (data: StockAdjustmentHeaders) => {
    try {
      const respo = repo.create(data);
      await repo.save(respo);
      return respo;
    } catch (error) {
      throw error;
    }
  };
  return {
    find,
    create,
  };
};
// Exporting an async function that resolves to an object containing find and findOne
export default repository;
