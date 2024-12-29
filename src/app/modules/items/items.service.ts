import { FindManyOptions } from "typeorm";
import { Item } from "./entities/items.entity";
import repository from "./items.repo";
//1. find multiple records
const find = async (filter?: FindManyOptions<Item>) => {
  try {
    const itemRepo = await repository();
    return itemRepo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (id: number) => {
  try {
    const itemRepo = await repository();
    const item = await itemRepo.findOneById(id);
    return item;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: Item) => {
  try {
    const itemRepo = await repository();
    const item = itemRepo.create(data);
    return item;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Item) => {
  const itemRepo = await repository();
  await itemRepo.updateById(id, data);
  try {
  } catch (error) {
    throw error;
  }
};

//5. delete single record by id
const deleteById = async (id: number) => {
  try {
    const itemRepo = await repository();
    await itemRepo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

export default { find, findById, create, deleteById, updateById };
