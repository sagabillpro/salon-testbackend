import { FindManyOptions, FindOneOptions, Not } from "typeorm";
import { generateCode } from "../../utils/get-object-code.util";
import repository from "./services.repo";
import { Services } from "./entities/services.entity";
import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";
import taxesService from "../taxes/taxes.service";

//1. find multiple records
const find = async (filter?: FindManyOptions<Services>) => {
  try {
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (
  id: number,
  filter?: FindOneOptions<Services> | FindManyOptions<Services>
) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id, filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: Services) => {
  try {
    const repo = await repository();
    data = await generateCode(15, data);
    if (!data.isService) {
      const duplicate = await repo.find({
        where: {
          sku: data.sku,
        },
      });
      if (duplicate.length) {
        throw {
          message: "Duplicate SKU please check again.: ",
          statusCode: 409,
        };
      }
    }

    //get latest tax id
    const latestTax = await taxesService.findById(data.taxRecordId);
    if (!latestTax) {
      throw {
        message: "Record not found with id: " + data.taxRecordId,
        statusCode: 404,
      };
    }
    const respo = repo.create({
      ...data,
      taxId: latestTax.id,
      taxRecordId: data.taxRecordId,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Services) => {
  try {
    if (!data.isService) {
      const duplicate = await find({
        where: {
          sku: data.sku,
          id: Not(data.id),
        },
      });
      if (duplicate.length) {
        throw {
          message: "Duplicate SKU please check again.: ",
          statusCode: 409,
        };
      }
      //get latest tax id
      const latestTax = await taxesService.findById(data.taxRecordId);
      if (!latestTax) {
        throw {
          message: "Record not found with id: " + data.taxRecordId,
          statusCode: 404,
        };
      }
      data = { ...data, taxId: latestTax.id, taxRecordId: data.taxRecordId };
    }

    const repo = await repository();
    const respo = repo.updateById(id, {
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//5. delete single record by id
const deleteById = async (id: number) => {
  try {
    const repo = await repository();
    await repo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

export default { find, findById, create, deleteById, updateById };
