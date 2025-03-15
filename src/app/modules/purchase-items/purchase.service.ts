// import { FindManyOptions, FindOneOptions, In } from "typeorm";

// import { generateCode } from "../../utils/get-object-code.util";
// import { handler } from "../../config/dbconfig";
// import { City, Country, States } from "../general-data/entities";
// import repository from "./purchase.repo";
// import { PurchaseHeaders } from "./entities/purchase-headers.entity";
// import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
// import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";
// import itemStocksService from "../sale-items/item-stocks.service";
// import { Services } from "../services/entities/services.entity";
// import { ItemsStockTrack } from "./entities/item-stock-track.entity";
// import generateUniqueNumber from "../../utils/getuniquenumber.util";
// import { PurchaseLines } from "./entities/purchase-lines.entity";
// import { BlobOptions } from "buffer";

// //1. find multiple records
// const find = async (filter?: FindManyOptions<PurchaseHeaders>) => {
//   try {
//     const repo = await repository();
//     return repo.find(filter);
//   } catch (error) {
//     throw error;
//   }
// };
// //2. find single records
// const findById = async (
//   id: number,
//   filter?: FindOneOptions<PurchaseHeaders> | FindManyOptions<PurchaseHeaders>
// ) => {
//   try {
//     const repo = await repository();
//     const respo = await repo.findOneById(id, filter);
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };

// //3. create single record
// const create = async (data: PurchaseHeaders, isService: boolean = false) => {
//   try {
//     const repo = await repository();
//     const dataSource = await handler();
//     const itemStocksRepo = dataSource.getRepository(ItemAvailable);
//     data = await generateCode(20, data);
//     const itemIds: number[] = [];
//     const inventory: InventoryLines[] = [];

//     // check if lenght applicable
//     if (data.purchaseLines.length) {
//     }
//     if (!isService) {
//       data.purchaseLines.forEach((value) => {
//         const il = new InventoryLines();
//         (il.service = value.service),
//           (il.quantity = -Number(value.quantity)),
//           (il.createdDate = value.createdDate),
//           (il.modifiedDate = value.modifiedDate);
//         itemIds.push(value.service.id);
//         inventory.push(il);
//       });
//       data.inventoryLines = inventory;
//       // create stock elements
//       const resultItemStock = await itemStocksService.create(
//         inventory,
//         itemIds
//       );
//       const itemStockResponse = itemStocksRepo.create(resultItemStock);
//       await itemStocksRepo.save(itemStockResponse);
//     }
//     const respo = repo.create({
//       ...data,
//     });
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };

// //4. update single record by id
// const updateById = async (
//   id: number,
//   data: PurchaseHeaders,
//   isService: boolean = false
// ) => {
//   try {
//     const repo = await repository();
//     data = await generateCode(20, data);
//     const inventory: InventoryLines[] = [];
//     if (!isService) {
//       data.purchaseLines.forEach((value) => {
//         const il = new InventoryLines();
//         (il.service = value.service),
//           (il.quantity = -Number(value.quantity)),
//           (il.createdDate = value.createdDate),
//           (il.modifiedDate = value.modifiedDate);
//         inventory.push(il);
//       });
//       data.inventoryLines = inventory;
//     }
//     const respo = repo.updateById(id, {
//       ...data,
//     });
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };

// //5. delete single record by id
// const deleteById = async (id: number) => {
//   try {
//     const repo = await repository();
//     await repo.deleteById(id);
//   } catch (error) {
//     throw error;
//   }
// };
// // //3. create single record
// // const createBulk = async (data: PurchaseHeaders) => {
// //   try {
// //     const dataSource = await handler();
// //     data = await generateCode(20, data);
// //     const itemIds: number[] = [];
// //     const inventory: InventoryLines[] = [];
// //     const itemRepo = dataSource.getRepository(Services);

// //     data.purchaseLines.forEach((value) => {
// //       itemIds.push(value.service.id);
// //     });
// //     //. 1.create itemId and sku mapping
// //     const skuMap: {
// //       [key: number]: string;
// //     } = {};
// //     //2. get related items only
// //     const relatedItems = await itemRepo.find({
// //       where: {
// //         id: In(itemIds),
// //         isInactive: 0,
// //       },
// //       select: {
// //         sku: true,
// //         id: true,
// //       },
// //     });
// //     //create latest items mapping
// //     const latestItemMap = {};
// //     relatedItems.forEach((val) => {
// //       latestItemMap[val.recordId] = val.id;
// //     });
// //     data.purchaseLines = data.purchaseLines.map((value) => {
// //       return {
// //         ...value,
// //         serviceId: latestItemMap[value.service.id],
// //         serviceRecordId: value.service.id,
// //       };
// //     });
// //     //3. create sku mapping for future
// //     relatedItems.forEach((val) => {
// //       skuMap[val.id] = val.sku + "-" + generateUniqueNumber();
// //     });
// //     //3. start transaction
// //     await dataSource.manager.transaction(
// //       "SERIALIZABLE",
// //       async (transactionalEntityManager) => {
// //         const headerEntry = transactionalEntityManager.create(
// //           PurchaseHeaders,
// //           data
// //         );
// //         // ************** A) stock logic start ************************************************************
// //         const stockEntries: ItemsStockTrack[] = [];
// //         //1. create Stock and save stock
// //         data.purchaseLines.forEach((value) => {
// //           const stockInstance = new ItemsStockTrack();
// //           stockInstance.createdDate = value.createdDate;
// //           stockInstance.modifiedDate = value.modifiedDate;
// //           stockInstance.quantityAdded = value.quantity;
// //           stockInstance.unitPrice = value.unitPrice;
// //           // stockInstance.service = value.service;
// //           stockInstance.serviceId = latestItemMap[value.service.id];
// //           stockInstance.serviceRecordId = value.service.id;
// //           stockInstance.quantityUvailable = value.quantity;
// //           stockInstance.stockNumber = skuMap[value.service.id];
// //           stockEntries.push(stockInstance);
// //         });
// //         const itemIdStockMap: {
// //           [key: number]: ItemsStockTrack;
// //         } = {};
// //         const stockTrackEntry = transactionalEntityManager.create(
// //           ItemsStockTrack,
// //           stockEntries
// //         );
// //         //2. update items availability
// //         const stockTrackResult = await transactionalEntityManager.save(
// //           ItemsStockTrack,
// //           stockTrackEntry
// //         );
// //         // add entries into mapping object
// //         stockTrackResult.forEach((val) => {
// //           itemIdStockMap[val.service.id] = val;
// //         });
// //         //************** stock logic end ***********************************************************************/

// //         //**************** B) inventory lodic start **********************************************************
// //         //2. create inventory
// //         data.purchaseLines.forEach((value) => {
// //           const il = new InventoryLines();
// //           // il.service = value.service;
// //           il.serviceRecordId = value.service.id;
// //           il.serviceId = latestItemMap[value.service.id];
// //           il.quantity = Number(value.quantity);
// //           il.createdDate = value.createdDate;
// //           il.modifiedDate = value.modifiedDate;
// //           il.stock = itemIdStockMap[value.service.id];
// //           inventory.push(il);
// //         });
// //         //attch the object to inventory
// //         headerEntry.inventoryLines = inventory;
// //         // *************** inventory lodic end  *********************************************************

// //         // *************** C) item available start ********************************************************
// //         //1. create stock elements
// //         const resultItemAvailable = await itemStocksService.create(
// //           inventory,
// //           itemIds
// //         );
// //         const itemAvailableEntry = transactionalEntityManager.create(
// //           ItemAvailable,
// //           resultItemAvailable
// //         );
// //         //2. update items availability
// //         await transactionalEntityManager.save(
// //           ItemAvailable,
// //           itemAvailableEntry
// //         );
// //         // *************** item available end ********************************************************

// //         //********** D) header entry save start ***************/
// //         const headerEntryResult = await transactionalEntityManager.save(
// //           PurchaseHeaders,
// //           headerEntry
// //         );
// //         //********** header entry save end *********************************************************************/
// //         data = headerEntryResult;
// //       }
// //     );
// //     return data;
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// const createBulk = async (
//   data: PurchaseHeaders,
//   isCalledForEdit: Boolean = false
// ) => {
//   try {
//     const dataSource = await handler();

//     // Generate a unique code for the purchase header

//     data = await generateCode(20, data);

//     // Extract all service IDs from purchase lines
//     const itemIds = data.purchaseLines.map((line) => line.serviceId);

//     const itemRepo = dataSource.getRepository(Services);

//     // Fetch related (active) services with required fields
//     const relatedItems = await itemRepo.find({
//       where: { id: In(itemIds), isInactive: 0 },
//       select: { sku: true, id: true },
//     });

//     // Build mappings for latest service and SKU generation
//     const skuMap: Record<number, string> = {};
//     relatedItems.forEach((item) => {
//       skuMap[item.id] = `${item.sku}-${generateUniqueNumber()}`;
//     });

//     // Update purchase lines with latest serviceId and store original record id
//     data.purchaseLines = data.purchaseLines.map((line) => ({
//       ...line,
//       serviceId: line.serviceId,
//       //serviceRecordId: line.service.id,
//     }));

//     // Start transaction to handle stock updates, inventory, and header insertion
//     await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
//       // Create the purchase header entry
//       const headerEntry = manager.create(PurchaseHeaders, data);

//       // === STOCK LOGIC ===
//       // Create stock entries for each purchase line
//       const stockEntries = data.purchaseLines.map((line) => {
//         const stock = new ItemsStockTrack();
//         stock.createdDate = line.createdDate;
//         stock.modifiedDate = line.modifiedDate;
//         stock.quantityAdded = line.quantity;
//         stock.unitPrice = line.unitPrice;
//         stock.serviceId = line.serviceId;
//         stock.quantityUvailable = line.quantity;
//         stock.stockNumber = skuMap[line.service.id];
//         return stock;
//       });

//       // Save stock entries and build a mapping by service id
//       const stockTrackResult = await manager.save(
//         ItemsStockTrack,
//         stockEntries
//       );
//       const itemIdStockMap: Record<number, ItemsStockTrack> = {};
//       stockTrackResult.forEach((stock) => {
//         itemIdStockMap[stock.service.id] = stock;
//       });

//       // === INVENTORY LOGIC ===
//       // Create inventory lines referencing the saved stock entries
//       const inventory = data.purchaseLines.map((line) => {
//         const invLine = new InventoryLines();
//         invLine.serviceId = line.serviceId;
//         invLine.quantity = Number(line.quantity);
//         invLine.createdDate = line.createdDate;
//         invLine.modifiedDate = line.modifiedDate;
//         invLine.stock = itemIdStockMap[line.service.id];
//         return invLine;
//       });
//       headerEntry.inventoryLines = inventory;

//       // === ITEM AVAILABLE LOGIC ===
//       // Create/update item availability based on inventory changes
//       const resultItemAvailable = await itemStocksService.create(
//         inventory,
//         itemIds
//       );
//       // const itemAvailableEntry = manager.create(
//       //   ItemAvailable,
//       //   resultItemAvailable
//       // );
//       await manager.save(ItemAvailable, resultItemAvailable);

//       // === HEADER ENTRY SAVE ===
//       const headerEntryResult = await manager.save(
//         PurchaseHeaders,
//         headerEntry
//       );
//       const stockTrackResultNew = stockTrackResult.map((stock) => {
//         stock.txnHeaderId = headerEntryResult.id;
//         return stock; // Ensure the modified stock object is returned
//       });
//       await manager.save(ItemsStockTrack, stockTrackResultNew);
//       data = headerEntryResult;
//     });

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// const editBulk = async (data: PurchaseHeaders) => {
//   try {
//     //1. get the purchase header latest
//     const dataSource = await handler();
//     const headerRepo = dataSource.getRepository(PurchaseHeaders);
//     const purchaseLinesRepo = dataSource.getRepository(PurchaseLines);
//     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
//     const itemsStockTrackRepo = dataSource.getRepository(ItemsStockTrack);
//     const inventoryLinesRepo = dataSource.getRepository(InventoryLines);
//     let headerResponse = await headerRepo.findOne({
//       where: {
//         id: data.id,
//         isInactive: 0,
//       },
//     });
//     if (!headerResponse) {
//       throw {
//         message: "Record not found with id: " + data.id,
//         statusCode: 404,
//       };
//     }
//     //2. get the purchase lines latest
//     const purchaseLinesOld = await purchaseLinesRepo.find({
//       where: {
//         txnHeaderId: data.id,
//         isInactive: 0,
//       },
//     });
//     //5. get the item stock track latest
//     const itemStockTrack = await itemsStockTrackRepo.find({
//       where: {
//         txnHeaderId: data.id,
//         isInactive: 0,
//       },
//     });
//     //if in itemStockTrack if quantityAdded is not equal to quantityUvailable  then throw error

//     itemStockTrack.forEach((val) => {
//       if (val.quantityAdded !== val.quantityUvailable) {
//         throw {
//           message:
//             "This purchase transaction is in use and cannot be edited, please contact support",
//           statusCode: 409,
//         };
//       }
//     });
//     //3. get the inventory lines latest
//     const inventoryLines = await inventoryLinesRepo.find({
//       where: {
//         purchaseId: data.id,
//         isInactive: 0,
//       },
//     });
//     //loop inventoryLines and create mapping object for serviceId and quantity
//     const inventoryMap = {};
//     purchaseLinesOld.forEach((val) => {
//       inventoryMap[val.serviceId] = val.quantity;
//     });
//     //4. get the item available latest and minus the quantity from the item available using inventoryMap

//     const itemAvailable = await itemAvailableRepo.find({
//       where: {
//         serviceId: In(Object.keys(inventoryMap)),
//         isInactive: 0,
//       },
//     });
//     //create mapping object for serviceId and quantity
//     const itemAvailableMap = {};
//     itemAvailable.forEach((val) => {
//       itemAvailableMap[val.serviceId] = val.quantity;
//     });
//     //loop through the inventoryMap and minus the quantity from itemAvailableMap
//     Object.keys(inventoryMap).forEach((key) => {
//       //if this is negative means any conflict happent throw error
//       if (itemAvailableMap[key] - inventoryMap[key] < 0) {
//         throw {
//           message:
//             "This purchase transaction is in use and cannot be edited, please contact support",
//           statusCode: 409,
//         };
//       }
//       itemAvailableMap[key] = itemAvailableMap[key] - inventoryMap[key];
//     });
//     //update the itemAvailable
//     const itemAvailableUpdate = itemAvailable.map((val) => {
//       val.quantity = itemAvailableMap[val.serviceId];
//       return val;
//     });

//     //create new purchase transaction
//     await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
//       //update the itemAvailable for rollback
//       await manager.save(ItemAvailable, itemAvailableUpdate);

//       //make purchaseLines iteStockTrack and inventoryLines inactive
//       await manager.save(
//         PurchaseLines,
//         purchaseLinesOld.map((val) => {
//           val.isInactive = 1;
//           return val;
//         })
//       );
//       await manager.save(
//         ItemsStockTrack,
//         itemStockTrack.map((val) => {
//           val.isInactive = 1;
//           return val;
//         })
//       );
//       await manager.save(
//         InventoryLines,
//         inventoryLines.map((val) => {
//           val.isInactive = 1;
//           return val;
//         })
//       );

//       let { purchaseLines, ...headerWithoutLines } = data;

//       headerResponse = await manager.save(PurchaseHeaders, {
//         ...headerResponse,
//         ...headerWithoutLines,
//       });

//       //create new purchase transaction

//       // add new line data for edited transaction
//       // Extract all service IDs from purchase lines
//       const itemIds = purchaseLines.map((line) => line.serviceId);

//       const itemRepo = dataSource.getRepository(Services);

//       // Fetch related (active) services with required fields
//       const relatedItems = await itemRepo.find({
//         where: { id: In(itemIds), isInactive: 0 },
//         select: { sku: true, id: true },
//       });

//       // Build mappings for latest service and SKU generation
//       const skuMap: Record<number, string> = {};
//       relatedItems.forEach((item) => {
//         skuMap[item.id] = `${item.sku}-${generateUniqueNumber()}`;
//       });
//       // === STOCK LOGIC ===
//       // Create stock entries for each purchase line
//       const stockEntries = purchaseLines.map((line) => {
//         const stock = new ItemsStockTrack();
//         stock.createdDate = line.createdDate;
//         stock.modifiedDate = line.modifiedDate;
//         stock.quantityAdded = line.quantity;
//         stock.unitPrice = line.unitPrice;
//         stock.serviceId = line.serviceId;
//         stock.txnHeaderId = headerResponse ? headerResponse.id : 0;
//         stock.quantityUvailable = line.quantity;
//         stock.stockNumber = skuMap[line.service.id];
//         return stock;
//       });

//       // Save stock entries and build a mapping by service id
//       const stockTrackResult = await manager.save(
//         ItemsStockTrack,
//         stockEntries
//       );
//       const itemIdStockMap: Record<number, number> = {};
//       stockTrackResult.forEach((stock) => {
//         itemIdStockMap[stock.serviceId] = stock.id;
//       });

//       // === INVENTORY LOGIC ===
//       // Create inventory lines referencing the saved stock entries
//       const inventory = purchaseLines.map((line) => {
//         const invLine = new InventoryLines();
//         invLine.serviceId = line.serviceId;
//         invLine.quantity = Number(line.quantity);
//         invLine.createdDate = line.createdDate;
//         invLine.modifiedDate = line.modifiedDate;
//         invLine.stockId = itemIdStockMap[line.serviceId];
//         invLine.purchaseId = headerResponse ? headerResponse.id : 0;
//         return invLine;
//       });

//       // === ITEM AVAILABLE LOGIC ===
//       // Create/update item availability based on inventory changes
//       const resultItemAvailable = await itemStocksService.create(
//         inventory,
//         itemIds
//       );
//       await manager.save(ItemAvailable, resultItemAvailable);

//       data = headerResponse;
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// // const purchaseReturn = async (
// //   data: PurchaseHeaders
// // ): Promise<PurchaseHeaders> => {
// //   try {
// //     const dataSource = await handler();
// //     const headerRepo = dataSource.getRepository(PurchaseHeaders);
// //     const purchaseLinesRepo = dataSource.getRepository(PurchaseLines);
// //     const inventoryLinesRepo = dataSource.getRepository(InventoryLines);
// //     const stockTrackRepo = dataSource.getRepository(ItemsStockTrack);
// //     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);

// //     // 1. Fetch the active purchase header and its related records
// //     const header = await headerRepo.findOne({
// //       where: { recordId: data.recordId, isInactive: 0 },
// //     });
// //     const purchaseLines = await purchaseLinesRepo.find({
// //       where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
// //     });
// //     const inventoryLines = await inventoryLinesRepo.find({
// //       where: { purchaseRecordId: data.recordId, isInactive: 0 },
// //       relations: { stock: true },
// //     });
// //     const stockTracks = await stockTrackRepo.find({
// //       where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
// //     });

// //     // 2. Validate eligibility for return (ensure no partial processing has occurred)
// //     stockTracks.forEach((stock) => {
// //       if (stock.quantityAdded !== stock.quantityUvailable) {
// //         throw {
// //           message: "Purchase transaction is in use and cannot be returned.",
// //           statusCode: 409,
// //         };
// //       }
// //     });

// //     // 3. Build mapping of serviceId to total purchased quantity from purchase lines
// //     const purchasedQuantityMap: Record<number, number> = {};
// //     purchaseLines.forEach((line) => {
// //       purchasedQuantityMap[line.serviceId] =
// //         (purchasedQuantityMap[line.serviceId] || 0) + line.quantity;
// //     });

// //     // 4. Fetch item availability records for these services
// //     const availableItems = await itemAvailableRepo.find({
// //       where: {
// //         serviceId: In(Object.keys(purchasedQuantityMap).map(Number)),
// //         isInactive: 0,
// //       },
// //     });
// //     // Build mapping for current available quantity per service
// //     const availableMap: Record<number, number> = {};
// //     availableItems.forEach((item) => {
// //       availableMap[item.serviceId] = item.quantity;
// //     });

// //     // For purchase return, reverse the addition done during purchase by subtracting the purchased quantities
// //     Object.keys(purchasedQuantityMap).forEach((serviceIdStr) => {
// //       const serviceId = Number(serviceIdStr);
// //       // If subtracting results in negative availability, then it's an error (cannot return more than available)
// //       if (availableMap[serviceId] - purchasedQuantityMap[serviceId] < 0) {
// //         throw {
// //           message:
// //             "Purchase transaction is in use and cannot be returned, please contact support",
// //           statusCode: 409,
// //         };
// //       }
// //       availableMap[serviceId] =
// //         availableMap[serviceId] - purchasedQuantityMap[serviceId];
// //     });

// //     // Prepare updated item available records for purchase return
// //     const updatedAvailableItems = availableItems.map((item) => {
// //       item.quantity = availableMap[item.serviceId];
// //       return item;
// //     });

// //     // 5. Wrap operations in a transaction
// //     let newPurchaseReturn: PurchaseHeaders;
// //     await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
// //       // Update item availability for the return
// //       await manager.save(ItemAvailable, updatedAvailableItems);

// //       // Mark original purchase lines, stock tracks, and inventory lines as inactive
// //       await manager.save(
// //         PurchaseLines,
// //         purchaseLines.map((line) => ({ ...line, isInactive: 1 }))
// //       );
// //       await manager.save(
// //         ItemsStockTrack,
// //         stockTracks.map((stock) => ({ ...stock, isInactive: 1 }))
// //       );
// //       await manager.save(
// //         InventoryLines,
// //         inventoryLines.map((inv) => ({ ...inv, isInactive: 1 }))
// //       );

// //       // Mark the purchase header as inactive
// //       const updatedHeader = await manager.save(PurchaseHeaders, {
// //         ...header,
// //         isInactive: 1,
// //       });

// //       // 6. Create a new purchase return transaction record referencing the original purchase
// //       // You can create a function like createBulkPurchaseReturn similar to createBulk but for returns
// //       // newPurchaseReturn = await createBulkPurchaseReturn({
// //       //   ...data,
// //       //   recordId: updatedHeader.recordId,
// //       //   code: updatedHeader.code,
// //       //   // Additional fields for return details, e.g., returnDate
// //       // });
// //     });

// //     return {} as PurchaseHeaders;
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// export default {
//   find,
//   findById,
//   create,
//   deleteById,
//   updateById,
//   createBulk,
//   editBulk,
// };

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
const createBulk = async (data: PurchaseHeaders) => {
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
    console.log("pass1 ");
    await dataSource.manager.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const headerEntry = transactionalEntityManager.create(
          PurchaseHeaders,
          data
        );
        console.log("pass2");

        // ************** A) stock logic start ************************************************************
        const stockEntries: ItemsStockTrack[] = [];
        //1. create Stock and save stock
        console.log("pass3 ");

        data.purchaseLines.forEach((value) => {
          const stockInstance = new ItemsStockTrack();
          stockInstance.createdDate = value.createdDate;
          stockInstance.modifiedDate = value.modifiedDate;
          stockInstance.quantityAdded = value.quantity;
          stockInstance.unitPrice = value.unitPrice;
          stockInstance.serviceId = value.service.id;
          stockInstance.quantityUvailable = value.quantity;
          stockInstance.txnHeaderId=headerEntry.id
          stockInstance.stockNumber = skuMap[value.service.id];
          stockEntries.push(stockInstance);
        });
        const itemIdStockMap: {
          [key: number]: number;
        } = {};
        console.log("pass4");

        const stockTrackEntry = transactionalEntityManager.create(
          ItemsStockTrack,
          stockEntries
        );
        console.log("pass5");

        //2. update items availability
        const stockTrackResult = await transactionalEntityManager.save(
          ItemsStockTrack,
          stockTrackEntry
        );
        console.log("pass6");

        // add entries into mapping object
        stockTrackResult.forEach((val) => {
          itemIdStockMap[val.serviceId] = val.id;
        });
        //************** stock logic end ***********************************************************************/

        //**************** B) inventory lodic start **********************************************************
        //2. create inventory
        console.log("pass7");
        data.purchaseLines.forEach((value) => {
          const il = new InventoryLines();
          il.serviceId = value.service.id;
          il.quantity = Number(value.quantity);
          il.createdDate = value.createdDate;
          il.modifiedDate = value.modifiedDate;
          il.purchaseId = headerEntry.id;
          il.stockId = itemIdStockMap[value.service.id];
          inventory.push(il);
        });
        console.log("pass8");
        //attch the object to inventory
        headerEntry.inventoryLines = inventory;
        // *************** inventory lodic end  *********************************************************

        // *************** C) item available start ********************************************************
        //1. create stock elements
        console.log("pass9");
        const resultItemAvailable = await itemStocksService.create(
          inventory,
          itemIds
        );
        console.log("pass10");
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
    console.log(error);
    throw error;
  }
};
export default { find, findById, create, deleteById, updateById, createBulk };
