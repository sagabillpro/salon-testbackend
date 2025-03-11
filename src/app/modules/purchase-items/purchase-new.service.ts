import { DataSource, In } from "typeorm";
import { PurchaseLines } from "./entities/purchase-lines.entity";
import { ItemsStockTrack } from "./entities/item-stock-track.entity";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
import itemStocksService from "../sale-items/item-stocks.service";
import { ItemAvailable } from "../sale-items/entities/item-stocks.entity";
import { PurchaseHeaders } from "./entities/purchase-headers.entity";
import { handler } from "../../config/dbconfig";
import { generateCode } from "../../utils/get-object-code.util";
import { Services } from "../services/entities/services.entity";
import generateUniqueNumber from "../../utils/getuniquenumber.util";

// Function to increase inventory (used for Purchase creation/edit)
const increaseInventory = async (
  manager: DataSource["manager"],
  purchaseLines: PurchaseLines[],
  skuMap: Record<number, string>,
  headerId?: number // Optional headerId for linking stock entries in edit scenario
) => {
  // === STOCK LOGIC ===
  // Create stock entries for each purchase line
  const stockEntries = purchaseLines.map((line) => {
    const stock = new ItemsStockTrack();
    stock.createdDate = line.createdDate;
    stock.modifiedDate = line.modifiedDate;
    stock.quantityAdded = line.quantity;
    stock.unitPrice = line.unitPrice;
    stock.serviceId = line.serviceId;
    stock.quantityUvailable = line.quantity;
    stock.stockNumber = skuMap[line.serviceId]; // Use serviceId as key
    if (headerId) {
      stock.txnHeaderId = headerId; // Link to header if available (edit scenario)
    }
    return stock;
  });

  // Save stock entries and build a mapping by service id
  const stockTrackResult = await manager.save(ItemsStockTrack, stockEntries);
  const itemIdStockMap: Record<number, ItemsStockTrack> = {};
  stockTrackResult.forEach((stock) => {
    itemIdStockMap[stock.serviceId] = stock; // Use serviceId as key
  });

  // === INVENTORY LOGIC ===
  // Create inventory lines referencing the saved stock entries
  const inventory = purchaseLines.map((line) => {
    const invLine = new InventoryLines();
    invLine.serviceId = line.serviceId;
    invLine.quantity = Number(line.quantity);
    invLine.createdDate = line.createdDate;
    invLine.modifiedDate = line.modifiedDate;
    invLine.stock = itemIdStockMap[line.serviceId]; // Use serviceId as key
    if (headerId) {
      invLine.purchaseId = headerId; // Link to header if available (edit scenario)
    }
    return invLine;
  });

  // === ITEM AVAILABLE LOGIC ===
  // Create/update item availability based on inventory changes
  const itemIds = purchaseLines.map((line) => line.serviceId);
  const resultItemAvailable = await itemStocksService.create(
    inventory,
    itemIds
  );
  await manager.save(ItemAvailable, resultItemAvailable);

  return { stockTrackResult, inventory }; // Return relevant results if needed
};

// Function to decrease inventory (currently adapted for Purchase Edit Rollback)
// Note: This function is tailored for reversing a PURCHASE, not general sales decrease.
const decreaseInventoryForPurchaseEditRollback = async (
  manager: DataSource["manager"],
  purchaseLinesNew: PurchaseLines[], // Original purchase lines to reverse
  itemAvailableMap: Record<number, number> // Current item availability map
) => {
  const itemAvailableRepo = manager.getRepository(ItemAvailable);
  const inventoryMap = {};
  purchaseLinesNew.forEach((val) => {
    inventoryMap[val.serviceId] = val.quantity;
  });

  // Prepare ItemAvailable updates to restore quantities
  const itemAvailableUpdate = await itemAvailableRepo.find({
    where: {
      serviceId: In(Object.keys(inventoryMap)),
      isInactive: 0,
    },
  });

  itemAvailableUpdate.forEach((val) => {
    val.quantity = itemAvailableMap[val.serviceId]; // Restore quantity
  });

  await manager.save(ItemAvailable, itemAvailableUpdate);
};

const createBulk = async (
  data: PurchaseHeaders,
  isCalledForEdit: Boolean = false
) => {
  try {
    const dataSource = await handler();

    // Generate a unique code for the purchase header if not edit
    if (!isCalledForEdit) {
      // Generate code only for new purchases
      data = await generateCode(20, data);
    }

    // Extract all service IDs from purchase lines
    const itemIds = data.purchaseLines.map((line) => line.serviceId);

    const itemRepo = dataSource.getRepository(Services);

    // Fetch related (active) services with required fields
    const relatedItems = await itemRepo.find({
      where: { id: In(itemIds), isInactive: 0 },
      select: { sku: true, id: true }, // Include recordId
    });

    // Build mappings for latest service and SKU generation
    const skuMap: Record<number, string> = {};
    const latestItemMap: Record<number, number> = {}; // recordId to latest id
    relatedItems.forEach((item) => {
      skuMap[item.id] = `${item.sku}-${generateUniqueNumber()}`;
      latestItemMap[item.id] = item.id; // Map recordId to latest id
    });

    // Update purchase lines with latest serviceId and store original record id
    data.purchaseLines = data.purchaseLines.map((line) => ({
      ...line,
      serviceId: latestItemMap[line.serviceId], // Use latest id
    }));

    // Start transaction to handle stock updates, inventory, and header insertion
    await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
      // Create the purchase header entry
      const headerEntry = manager.create(PurchaseHeaders, data);
      const headerEntryResult = await manager.save(
        PurchaseHeaders,
        headerEntry
      );

      // Increase inventory using the new function
      const inventoryResult = await increaseInventory(
        manager,
        data.purchaseLines,
        skuMap,
        headerEntryResult.id // Pass headerId for linking
      );

      data = headerEntryResult; // Return header entry as before
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const editBulk = async (data: PurchaseHeaders) => {
  try {
    //1. get the purchase header latest
    const dataSource = await handler();
    const headerRepo = dataSource.getRepository(PurchaseHeaders);
    const purchaseLinesRepo = dataSource.getRepository(PurchaseLines);
    const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
    const itemsStockTrackRepo = dataSource.getRepository(ItemsStockTrack);
    const inventoryLinesRepo = dataSource.getRepository(InventoryLines);
    let headerResponse = await headerRepo.findOne({
      where: {
        id: data.id,
        isInactive: 0,
      },
    });
    if (!headerResponse) {
      throw {
        message: "Record not found with id: " + data.id,
        statusCode: 404,
      };
    }
    //2. get the purchase lines latest
    const purchaseLinesNew = await purchaseLinesRepo.find({
      where: {
        txnHeaderId: data.id,
        isInactive: 0,
      },
    });
    //5. get the item stock track latest
    const itemStockTrack = await itemsStockTrackRepo.find({
      where: {
        txnHeaderId: data.id,
        isInactive: 0,
      },
    });
    //if in itemStockTrack if quantityAdded is not equal to quantityUvailable  then throw error

    itemStockTrack.forEach((val) => {
      if (val.quantityAdded !== val.quantityUvailable) {
        throw {
          message:
            "This purchase transaction is in use and cannot be edited, please contact support",
          statusCode: 409,
        };
      }
    });
    //3. get the inventory lines latest
    const inventoryLines = await inventoryLinesRepo.find({
      where: {
        purchaseId: data.id,
        isInactive: 0,
      },
    });
    //loop inventoryLines and create mapping object for serviceId and quantity
    const inventoryMap = {};
    purchaseLinesNew.forEach((val) => {
      inventoryMap[val.serviceId] = val.quantity;
    });
    //4. get the item available latest and minus the quantity from the item available using inventoryMap

    const itemAvailable = await itemAvailableRepo.find({
      where: {
        serviceId: In(Object.keys(inventoryMap)),
        isInactive: 0,
      },
    });
    //create mapping object for serviceId and quantity
    const itemAvailableMap: Record<number, number> = {};
    itemAvailable.forEach((val) => {
      itemAvailableMap[val.serviceId] = val.quantity;
    });

    //create new purchase transaction
    await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
      // Decrease inventory by restoring ItemAvailable quantities
      await decreaseInventoryForPurchaseEditRollback(
        manager,
        purchaseLinesNew,
        itemAvailableMap
      );

      //make purchaseLines iteStockTrack and inventoryLines inactive
      await manager.save(
        PurchaseLines,
        purchaseLinesNew.map((val) => {
          val.isInactive = 1;
          return val;
        })
      );
      await manager.save(
        ItemsStockTrack,
        itemStockTrack.map((val) => {
          val.isInactive = 1;
          return val;
        })
      );
      await manager.save(
        InventoryLines,
        inventoryLines.map((val) => {
          val.isInactive = 1;
          return val;
        })
      );

      //make the header inactive
      let { purchaseLines, ...headerWithoutLines } = data;

      headerResponse = await manager.save(PurchaseHeaders, {
        ...headerResponse,
        ...headerWithoutLines,
        isInactive: 1, // Mark as inactive
      });

      //create new purchase transaction (using createBulk in edit mode)
      data.code = headerResponse.code; //important to maintain code for history/linking
      data.isInactive = 0; // ensure new record is active
      await createBulk(data, true); // Call createBulk for recreation, passing isCalledForEdit = true

      data = headerResponse; //even though we are recreating we are sending old header response for now // consider returning new header from create bulk if needed
    });
    return data;
  } catch (error) {
    throw error;
  }
};
