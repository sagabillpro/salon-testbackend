import { FindManyOptions, FindOneOptions, In } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import repository from "./purchase.repo";
import { PurchaseHeaders } from "./entities/purchase-headers.entity";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";
import itemStocksService from "../sale-items/item-stocks.service";
import { Services } from "../services/entities/services.entity";
import { ItemsStockTrack } from "./entities/item-stock-track.entity";
import generateUniqueNumber from "../../utils/getuniquenumber.util";

//1. find multiple records
const find = async (filter?: FindManyOptions<PurchaseHeaders>) => {
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
  filter?: FindOneOptions<PurchaseHeaders> | FindManyOptions<PurchaseHeaders>
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
const create = async (data: PurchaseHeaders, isService: boolean = false) => {
  try {
    const repo = await repository();
    const dataSource = await handler();
    const itemStocksRepo = dataSource.getRepository(ItemAvailable);
    data = await generateCode(20, data);
    const itemIds: number[] = [];
    const inventory: InventoryLines[] = [];

    // check if lenght applicable
    if (data.purchaseLines.length) {
    }
    if (!isService) {
      data.purchaseLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = -Number(value.quantity)),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        itemIds.push(value.service.id);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
      // create stock elements
      const resultItemStock = await itemStocksService.create(
        inventory,
        itemIds
      );
      const itemStockResponse = itemStocksRepo.create(resultItemStock);
      await itemStocksRepo.save(itemStockResponse);
    }
    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (
  id: number,
  data: PurchaseHeaders,
  isService: boolean = false
) => {
  try {
    const repo = await repository();
    data = await generateCode(20, data);
    const inventory: InventoryLines[] = [];
    if (!isService) {
      data.purchaseLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = -Number(value.quantity)),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
    }
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
//3. create single record
const createBulk = async (
  data: PurchaseHeaders,
  isService: boolean = false
) => {
  try {
    const dataSource = await handler();
    data = await generateCode(20, data);
    const itemIds: number[] = [];
    const inventory: InventoryLines[] = [];
    const itemRepo = dataSource.getRepository(Services);

    data.purchaseLines.forEach((value) => {
      itemIds.push(value.service.id);
    });
    //. 1.create itemId and sku mapping
    const skuMap: {
      [key: number]: string;
    } = {};
    //2. get related items only
    const relatedItems = await itemRepo.find({
      where: {
        id: In(itemIds),
      },
      select: {
        sku: true,
        id: true,
      },
    });
    //3. create sku mapping for future
    relatedItems.forEach((val) => {
      skuMap[val.id] = val.sku + "-" + generateUniqueNumber();
    });
    //3. start transaction
    await dataSource.manager.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const headerEntry = transactionalEntityManager.create(
          PurchaseHeaders,
          data
        );
        // ************** A) stock logic start ************************************************************
        const stockEntries: ItemsStockTrack[] = [];
        //1. create Stock and save stock
        data.purchaseLines.forEach((value) => {
          const stockInstance = new ItemsStockTrack();
          stockInstance.createdDate = value.createdDate;
          stockInstance.modifiedDate = value.modifiedDate;
          stockInstance.quantityAdded = value.quantity;
          stockInstance.unitPrice = value.unitPrice;
          stockInstance.service = value.service;
          stockInstance.quantityUvailable = value.quantity;
          stockInstance.stockNumber = skuMap[value.service.id];
          stockEntries.push(stockInstance);
        });
        const itemIdStockMap: {
          [key: number]: ItemsStockTrack;
        } = {};
        const stockTrackEntry = transactionalEntityManager.create(
          ItemsStockTrack,
          stockEntries
        );
        //2. update items availability
        const stockTrackResult = await transactionalEntityManager.save(
          ItemsStockTrack,
          stockTrackEntry
        );
        // add entries into mapping object
        stockTrackResult.forEach((val) => {
          itemIdStockMap[val.service.id] = val;
        });
        //************** stock logic end ***********************************************************************/

        //**************** B) inventory lodic start **********************************************************
        //2. create inventory
        data.purchaseLines.forEach((value) => {
          const il = new InventoryLines();
          il.service = value.service;
          il.quantity = Number(value.quantity);
          il.createdDate = value.createdDate;
          il.modifiedDate = value.modifiedDate;
          il.stock = itemIdStockMap[value.service.id];
          inventory.push(il);
        });
        //attch the object to inventory
        headerEntry.inventoryLines = inventory;
        // *************** inventory lodic end  *********************************************************

        // *************** C) item available start ********************************************************
        //1. create stock elements
        const resultItemAvailable = await itemStocksService.create(
          inventory,
          itemIds
        );
        const itemAvailableEntry = transactionalEntityManager.create(
          ItemAvailable,
          resultItemAvailable
        );
        //2. update items availability
        await transactionalEntityManager.save(
          ItemAvailable,
          itemAvailableEntry
        );
        // *************** item available end ********************************************************

        //********** D) header entry save start ***************/
        const headerEntryResult = await transactionalEntityManager.save(
          PurchaseHeaders,
          headerEntry
        );
        //********** header entry save end *********************************************************************/
        data = headerEntryResult;
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export default { find, findById, create, deleteById, updateById, createBulk };
