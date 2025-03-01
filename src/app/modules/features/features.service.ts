import { FindManyOptions, FindOneOptions } from "typeorm";

import repository from "./features.repo";
import { Feature } from "./entities/features.entity";
import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";

//1. find multiple records
const find = async (filter?: FindManyOptions<Feature>) => {
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
  filter?: FindOneOptions<Feature> | FindManyOptions<Feature>
) => {
  try {
    console.log("filter",filter);
    const repo = await repository();
    const respo = await repo.findOneById(id, filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: Feature) => {
  try {

    const repo = await repository();
    data = await generateCode(28, data);
    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Feature) => {
  try {
    const repo = await repository();
  //  data = await generateCode(28, data);
    const respo = repo.updateById(id, {
      ...data
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
