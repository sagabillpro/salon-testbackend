import { FindManyOptions, FindOneOptions } from "typeorm";

import repository from "./contact.repo";
import { Contact } from "./entities/contact.entity";
import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { sendReferalEmail } from "../../services/send-referal-code.service";
import CompanyCoupounsService from "../send-coupouns/company-coupons.service";

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
        id: data.countryId,
      },
    });
    if (!country) {
      throw {
        message: "Record not found with id: " + data.countryId,
        statusCode: 404,
      };
    }

    //find a contact with the refered by id recoved from data and if not fond thrw the error
    if (data.referedById) {
      const referedBy = await findById(data.referedById, {
        relations: {
          company: true,
        },
        select: {
          company: {
            id: true,
            name: true,
            logo: true,
            email: true,
            tagLine: true,
          },
        },
      });
      if (!referedBy) {
        throw {
          message: "Record not found with id: " + data.referedById,
          statusCode: 404,
        };
      }
      await CompanyCoupounsService.sendReferalCode(referedBy, data.name);
    }

    const repo = await repository();
    data = await generateCode(26, data);
    const respo = repo.create({
      ...data,
      country: country,
    });
    return respo;
  } catch (error) {
    console.log(error);
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
        id: data.countryId,
      },
    });
    if (!country) {
      throw {
        message: "Record not found with id: " + data.countryId,
        statusCode: 404,
      };
    }

    const repo = await repository();
    //  data = await generateCode(14, data);
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
