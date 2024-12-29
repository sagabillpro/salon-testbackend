import { FindManyOptions, FindOneOptions, In } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { SaleHeaders } from "./entities/sale-header.entity";
import repository from "./sale-header.repo";
import { InventoryLines } from "./entities/inventory-lines.entity";
import invoiceMailer from "../../services/send-invoice-mail.service";
import customerService from "../customer/customer.service";
import { ItemAvailable } from "./entities/item-stocks.entity";
import itemStocksService from "./item-stocks.service";
import { Services } from "../services/entities/services.entity";
import { ItemsStockTrack } from "../purchase-items/entities/item-stock-track.entity";
import { Customer } from "../customer/entities/customer.entity";
import { Contact } from "../contacts/entities/contact.entity";
import contactService from "../contacts/contact.service";

//1. find multiple records
const find = async (filter?: FindManyOptions<SaleHeaders>) => {
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
  filter?: FindOneOptions<SaleHeaders> | FindManyOptions<SaleHeaders>
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
const create = async (data: SaleHeaders, isService: boolean = false) => {
  try {
    const dataSource = await handler();
    const repo = await repository();
    const customerRepo = dataSource.getRepository(Customer);
    data = await generateCode(19, data);
    const invoiceItems: {
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
      tax: number;
      taxName: string;
    }[] = [];
    if (data.saleLines.length) {
      data.saleLines.forEach((value) => {
        invoiceItems.push({
          name: value.service.name,
          quantity: value.quantity,
          unitPrice: value.rate,
          total: Number(value.amount),
          tax: value.taxAmount,
          taxName: value.tax.name,
        });
      });
    }
    const respo = await repo.create({
      ...data,
    });
    const custmerRepo = dataSource.getRepository(Contact);
    //get customer data custo
    let customer = await contactService.findById(data.customer.id);

    await custmerRepo.save({
      ...customer,
      lastVisitedDate: new Date().toISOString(),
    });
    await invoiceMailer({
      customer: customer.name,
      txnDate: new Date(data.txnDate).toLocaleDateString(),
      txnId: data.code,
      mobile: customer.mobile,
      subTotal: data.subTotal,
      grandTotal: data.grandTotal,
      tax: data.totalTax,
      discount: data.totalDiscount,
      email: customer.email,
      itemData: invoiceItems,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (
  id: number,
  data: SaleHeaders,
  isService: boolean = false
) => {
  try {
    const repo = await repository();
    data = await generateCode(19, data);
    const inventory: InventoryLines[] = [];
    if (!isService) {
      data.saleLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = value.quantity),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
    }
    const respo = await repo.updateById(id, {
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
const createBulk = async (data: SaleHeaders, isService: boolean = false) => {
  try {
    const repo = await repository();
    const dataSource = await handler();
    const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
    const itemStockTrack = dataSource.getRepository(ItemsStockTrack);
    data = await generateCode(19, data);
    let result: SaleHeaders = new SaleHeaders();
    const invoiceItems: {
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
      tax: number;
      taxName: string;
    }[] = [];

    const inventory: InventoryLines[] = [];
    const itemIds: number[] = [];
    const errors: string[] = [];
    const itemToQauntityMap: {
      [key: number]: {
        quantity: number;
        name: string;
        idx: number;
      };
    } = {};
    //get customer data custo
    let customer = await contactService.findById(data.customer.id);

    data.saleLines.forEach((value) => {
      invoiceItems.push({
        name: value.service.name,
        quantity: value.quantity,
        unitPrice: value.rate,
        total: Number(value.amount),
        tax: value.taxAmount,
        taxName: value.tax.name,
      });
      itemIds.push(value.service.id);
    });
    // get items available as per item demand
    let itemsAvailable = await itemAvailableRepo.find({
      where: {
        service: {
          id: In(itemIds),
        },
      },
      relations: {
        service: true,
      },
      select: {
        id: true,
        quantity: true,
        service: {
          id: true,
          name: true,
        },
      },
    });
    //add data to map
    itemsAvailable.forEach((val, index) => {
      itemToQauntityMap[val.service.id] = {
        name: val.service.name,
        quantity: val.quantity,
        idx: index,
      };
    });
    //check availabilty
    data.saleLines.forEach((value) => {
      if (itemToQauntityMap[value.service.id]) {
        if (itemToQauntityMap[value.service.id]?.quantity < value.quantity) {
          errors.push(
            `${
              itemToQauntityMap[value.service.id].name
            } is out of stock : available stock is ${
              itemToQauntityMap[value.service.id]?.quantity
                ? itemToQauntityMap[value.service.id]?.quantity
                : 0
            }`
          );
        }
      } else {
        errors.push(
          `${value.service.name} is out of stock : available stock is ${0}`
        );
      }
    });
    //throw error if applicable
    if (errors.length) {
      throw { message: errors, statusCode: 409 };
    }
    //get related stock track records
    const stockMap: {
      [key: number]: {
        id: number;
        idx: number;
        aQuanity: number;
      };
    } = {};
    let stockTrack = await itemStockTrack.find({
      where: {
        service: {
          id: In(itemIds),
        },
      },
      order: {
        id: "ASC",
      },
      relations: {
        service: true,
      },
    });
    stockTrack.forEach((val, index) => {
      stockMap[val.id] = {
        id: val.id,
        idx: index,
        aQuanity: val?.quantityUvailable,
      };
    });

    data.saleLines.forEach((value) => {
      //1. filter out stock entries for each item
      let idx = 0;
      let itmRemain = value.quantity;
      let uvailableForItem = stockTrack.filter(
        (val) => val.service.id === value.service.id
      );
      while (itmRemain) {
        //1. update current entry
        let _uvailableForItem = uvailableForItem[idx];
        //create inventory records here
        const il = new InventoryLines();
        il.service = value.service;

        il.createdDate = value.createdDate;
        il.modifiedDate = value.modifiedDate;
        il.stock = _uvailableForItem;
        let sold = _uvailableForItem.quantityUvailable - itmRemain;
        _uvailableForItem = {
          ..._uvailableForItem,
          quantityUvailable: sold > 0 ? sold : 0,
        };
        if (stockMap[_uvailableForItem.id]) {
          stockTrack[stockMap[_uvailableForItem.id].idx] = _uvailableForItem;
        }
        if (sold < 0) {
          il.quantity = -Number(itmRemain + sold);
          inventory.push(il);
          itmRemain = Math.abs(sold);
        } else {
          il.quantity = -Number(itmRemain);
          inventory.push(il);
          itmRemain = 0;
        }
        idx++;
      }

      //decrease item availabilty
      if (itemToQauntityMap[value.service.id]) {
        let _itemsAvailable =
          itemsAvailable[itemToQauntityMap[value.service.id].idx];
        _itemsAvailable = {
          ..._itemsAvailable,
          id: _itemsAvailable.id,
          quantity: _itemsAvailable.quantity - value.quantity,
        };
        itemsAvailable[itemToQauntityMap[value.service.id].idx] =
          _itemsAvailable;
      }
    });
    data.inventoryLines = inventory;
    //3. start transaction
    await dataSource.manager.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        //2. update items availability
        //2. update items availability
        await transactionalEntityManager.save(ItemsStockTrack, stockTrack);
        await transactionalEntityManager.save(ItemAvailable, itemsAvailable);
        const headerEntry = transactionalEntityManager.create(
          SaleHeaders,
          data
        );
        const headerEntryResult = await transactionalEntityManager.save(
          SaleHeaders,
          headerEntry
        );
        result = headerEntryResult;
      }
    );
    if (customer.email) {
      await invoiceMailer({
        customer: customer.name,
        txnDate: new Date(data.txnDate).toLocaleDateString(),
        txnId: data.code,
        mobile: customer.mobile,
        subTotal: data.subTotal,
        grandTotal: data.grandTotal,
        tax: data.totalTax,
        discount: data.totalDiscount,
        email: customer.email,
        itemData: invoiceItems,
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
};
export default { find, findById, create, deleteById, updateById, createBulk };
