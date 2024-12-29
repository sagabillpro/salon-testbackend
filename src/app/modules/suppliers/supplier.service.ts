import { FindManyOptions, FindOneOptions } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { Supplier } from "./entities/supplier.entity";
import repository from "./supplier.repo";

//1. find multiple records
const find = async (filter?: FindManyOptions<Supplier>) => {
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
  filter?: FindOneOptions<Supplier> | FindManyOptions<Supplier>
) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id,filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: Supplier) => {
  try {
    const dataSource = await handler();
    const countryRepo = dataSource.getRepository(Country);
    const stateRepo = dataSource.getRepository(States);
    const cityRepo = dataSource.getRepository(City);
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

    const state = await stateRepo.findOne({
      where: {
        id: data.state.id,
      },
    });
    if (!state) {
      throw {
        message: "Record not found with id: " + data.state.id,
        statusCode: 404,
      };
    }

    const city = await cityRepo.findOne({
      where: {
        id: data.city.id,
      },
    });
    if (!city) {
      throw {
        message: "Record not found with id: " + data.city.id,
        statusCode: 404,
      };
    }
    const repo = await repository();
    data = await generateCode(21, data);
    const respo = repo.create({
      ...data,
      city: city,
      state: state,
      country: country,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Supplier) => {
  try {
    const dataSource = await handler();
    const countryRepo = dataSource.getRepository(Country);
    const stateRepo = dataSource.getRepository(States);
    const cityRepo = dataSource.getRepository(City);
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

    const state = await stateRepo.findOne({
      where: {
        id: data.state.id,
      },
    });
    if (!state) {
      throw {
        message: "Record not found with id: " + data.state.id,
        statusCode: 404,
      };
    }

    const city = await cityRepo.findOne({
      where: {
        id: data.city.id,
      },
    });
    if (!city) {
      throw {
        message: "Record not found with id: " + data.city.id,
        statusCode: 404,
      };
    }
    const repo = await repository();
    data = await generateCode(21, data);
    const respo = await repo.updateById(id, {
      ...data,
      city: city,
      state: state,
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
