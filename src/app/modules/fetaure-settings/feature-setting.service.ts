import { FindManyOptions } from "typeorm";
import repository from "./feature-setting.repo";
import { FeatureSettings } from "./entities/feature-setting.entity";
import { handler } from "../../config/dbconfig";
import { DFeatureType, Menus } from "../general-data/entities";

//1. find multiple records
const find = async (filter?: FindManyOptions<FeatureSettings>) => {
  try {
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (id: number) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: FeatureSettings) => {
  try {
    const dataSource = await handler();
    const featureTypeRepo = dataSource.getRepository(DFeatureType);
    const menuRepo = dataSource.getRepository(Menus);
    const ftype = await featureTypeRepo.findOne({
      where: {
        id: data.featureType.id,
      },
    });
    const menu = await menuRepo.findOne({
      where: {
        id: data.menu.id,
      },
    });
    if (!menu) {
      throw {
        message: "Record not found with id: " + data.menu.id,
        statusCode: 404,
      };
    }
    if (!ftype) {
      throw {
        message: "Record not found with id: " + data.featureType.id,
        statusCode: 404,
      };
    }
    const repo = await repository();
    const respo = repo.create({
      ...data,
      featureType: ftype,
      menu: menu,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: FeatureSettings) => {
  try {
    const dataSource = await handler();
    const featureTypeRepo = dataSource.getRepository(DFeatureType);
    const menuRepo = dataSource.getRepository(Menus);
    const ftype = await featureTypeRepo.findOne({
      where: {
        id: data.featureType.id,
      },
    });
    const menu = await menuRepo.findOne({
      where: {
        id: data.menu.id,
      },
    });
    if (!menu) {
      throw {
        message: "Record not found with id: " + data.menu.id,
        statusCode: 404,
      };
    }
    if (!ftype) {
      throw {
        message: "Record not found with id: " + data.featureType.id,
        statusCode: 404,
      };
    }
    const repo = await repository();
    await repo.updateById(id, {
      ...data,
      featureType: ftype,
      menu: menu,
    });
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
