import { FindManyOptions, FindOneOptions } from "typeorm";

import repository from "./company.repo";
import { Company } from "./entities/company.entity";
import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { Branch } from "../branches/entities/branches.entity";
import { Taxes } from "../taxes/entities/taxes.entity";
import { checkUniqueConstraints } from "../../utils/check-duplicate.util";

//1. find multiple records
const find = async (filter?: FindManyOptions<Company>) => {
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
  filter?: FindOneOptions<Company> | FindManyOptions<Company>
) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id, filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

const create = async (data: Company) => {
  try {
    // 1. Get the data source/connection and initialize the repository for Country.
    const dataSource = await handler();
    const countryRepo = dataSource.getRepository(Country);

    await checkUniqueConstraints(data, Company);

    // 2. Validate that the specified country exists.
    const country = await countryRepo.findOne({
      where: { id: data.countryId },
    });
    if (!country) {
      throw {
        message: "Record not found with id: " + data.countryId,
        statusCode: 404,
      };
    }

    //find for tax and based on the id
    const taxRepo = dataSource.getRepository(Taxes);
    const tax = await taxRepo.findOne({
      where: { id: data.taxId },
    });
    if (!tax) {
      throw {
        message: "Record not found with id: " + data.taxId,
        statusCode: 404,
      };
    }
    // 3. Destructure the branches from the incoming data, keeping the rest as headerWithoutLines.
    let { branches, ...headerWithoutLines } = data;

    // });
    // 10. Return the newly created company record.
    await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
      // 5. generate a unique code for the company header.
      headerWithoutLines = await generateCode(27, {
        ...headerWithoutLines,
      });
      // 6. Create and save the company header record.
      const headerEntry = manager.create(Company, {
        ...headerWithoutLines,
        countryId: data.countryId,
        taxId: tax.id,
      });

      data = await manager.save(Company, headerEntry);
      // 7. Initialize an array to hold the Branch instances.
      const branchesNew: Branch[] = [];

      // 8. Iterate over the provided branches data (if any) to create new Branch instances.
      //    Each branch is associated with the saved company record (using companyId and companyRecordId).
      for (const value of branches || []) {
        try {
          await checkUniqueConstraints(value, Branch);
          const branchInstance: Branch = {
            ...value,
            companyId: data.id,
          };
          branchesNew.push(branchInstance);
        } catch (error) {
          // Handle or log the error as needed.
          throw error;
        }
      }
      
      // 9. Save all new Branch instances.
      await manager.save(Branch, branchesNew);
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 4. Update single Company record by id
const updateById = async (id: number, data: Company) => {
  try {
    // Get the data source/connection
    const dataSource = await handler();

    // Destructure the branches array from data,
    // keeping the rest of the company header data in headerWithoutLines.
    let { branches, ...headerWithoutLines } = data;

    // Start a transaction with SERIALIZABLE isolation level to ensure atomicity
    await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
      // 1. Retrieve the latest (active) Company record by recordId,
      // including its branches relationship.
      const currentHeaderRecord = await manager.findOne(Company, {
        where: { id: id },
      });

      if (!currentHeaderRecord) {
        throw {
          message: "Record not found with id: " + id,
          statusCode: 404,
        };
      }
      // 2. Mark the existing company record as inactive (soft delete it)
      // by saving a copy with isInactive set to 1.
      const data = await manager.save(Company, {
        ...currentHeaderRecord,
        ...headerWithoutLines,
      });

      // 7. Initialize an array to hold the Branch instances.
      const branchesNew: Branch[] = [];

      // 8. Iterate over the provided branches data (if any) to create new Branch instances.
      //    Each branch is associated with the saved company record (using companyId and companyRecordId).
      branches?.forEach((value) => {
        // Create a new branch instance by merging the incoming branch data
        // with the company association details from the saved company.
        const branchInstance: Branch = {
          ...value,
          companyId: data.id,
        };
        branchesNew.push(branchInstance);
      });
      // 9. Save all new Branch instances.
      await manager.save(Branch, branchesNew);
    });

    // Return the newly created (updated) Company record
    return data;
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
