import { FindManyOptions, FindOneOptions, Not } from "typeorm";
import { generateCode } from "../../utils/get-object-code.util";
import repository from "./stock-adjustment-headers.repo";

import { StockAdjustmentHeaders } from "./entities/stock-adjustment-headers.entity";
import { handler } from "../../config/dbconfig";
import { ItemsStockTrack } from "../purchase-items/entities/item-stock-track.entity";

//1. find multiple records
const find = async (filter?: FindManyOptions<StockAdjustmentHeaders>) => {
  try {
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};

//1. find multiple records
const findStocks = async (filter?: FindManyOptions<StockAdjustmentHeaders>) => {
  try {
    const dataSource = await handler();
    const stockRepo = dataSource.getRepository(ItemsStockTrack);
    const stockResponse = await stockRepo.find({
      where: {
        isInactive: 0,
      },
      select: {
        id: true,
        createdDate: true,
        modifiedDate: true,
        quantityAdded: true,
        quantityUvailable: true,
        unitPrice: true,
        stockNumber: true,
        service: {
          name: true,
          id: true,
        },
      },
      relations: {
        service: true,
      },
    });
    const data = [
      {
        id: 30,
        unitPrice: 178,
        stockNumber: "GRNP-20241226132106535168",
        quantityAdded: 7,
        quantityUvailable: 2,
        createdDate: "2024-12-26T07:51:05.390Z",
        modifiedDate: "2024-12-27 05:17:39.484661+00",
        service: {
          id: 31,
          name: "Garnier Men, Face Wash, Brightening"
        }
      },
      {
        id: 31,
        unitPrice: 100,
        stockNumber: "GRNP-20241226132106535169",
        quantityAdded: 5,
        quantityUvailable: 3,
        createdDate: "2024-12-26T07:51:06.390Z",
        modifiedDate: "2024-12-27 05:17:40.484661+00",
        service: {
          id: 31,
          name: "Garnier Men, Face Wash, Brightening"
        }
      },
      {
        id: 32,
        unitPrice: 200,
        stockNumber: "GRNP-20241226132106535170",
        quantityAdded: 10,
        quantityUvailable: 10,
        createdDate: "2024-12-26T07:51:07.390Z",
        modifiedDate: "2024-12-27 05:17:41.484661+00",
        service: {
          id: 32,
          name: "Nivea Men, Face Wash"
        }
      }
    ];
    const groupedData = data.reduce((acc: any, item: any) => {
      const serviceName = item.service.name;

      // Check if service name already exists
      const existingGroup: any = acc.find(
        (group: any) => group.name === serviceName
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        acc.push({
          name: serviceName,
          items: [item],
        });
      }

      return acc;
    }, []);
    return groupedData;
  } catch (error) {
    throw error;
  }
};
//3. create single record
const create = async (data: StockAdjustmentHeaders) => {
  try {
    const repo = await repository();
    data = await generateCode(14, data);

    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

export default { find, create, findStocks };
