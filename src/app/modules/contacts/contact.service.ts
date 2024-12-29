import { FindManyOptions, FindOneOptions } from "typeorm";

import repository from "./contact.repo";
import { Contact } from "./entities/contact.entity";
import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";

//1. find multiple records
const find = async (filter?: FindManyOptions<Contact>) => {
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
  filter?: FindOneOptions<Contact> | FindManyOptions<Contact>
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
const create = async (data: Contact) => {
  try {
    const dataSource = await handler();
    const countryRepo = dataSource.getRepository(Country);

    const country = await countryRepo.findOne({
      where: {
        id: data.country.id,
      },
    });
    if (!country) {
      throw {
        message: "Record not found with id: " + data.country.id,
        statusCode: 404,
      };
    }

    const repo = await repository();
    data = await generateCode(26, data);
    const respo = repo.create({
      ...data,
      country: country,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Contact) => {
  try {
    const dataSource = await handler();
    const countryRepo = dataSource.getRepository(Country);
    const country = await countryRepo.findOne({
      where: {
        id: data.country.id,
      },
    });
    if (!country) {
      throw {
        message: "Record not found with id: " + data.country.id,
        statusCode: 404,
      };
    }

    const repo = await repository();
    data = await generateCode(14, data);
    const respo = repo.updateById(id, {
      ...data,
      country: country,
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
