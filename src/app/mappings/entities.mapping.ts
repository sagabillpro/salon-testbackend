import { EntitySchema, MixedList } from "typeorm";
import { Customer } from "../modules/customer/entities/customer.entity";
import {
  City,
  Country,
  DContactType,
  DDateRangeType,
  DFeatureType,
  DItemType,
  DPaymentType,
  DUserType,
  Menus,
  States,
} from "../modules/general-data/entities";
import { ItemDescription } from "../modules/items/entities/item-description.enity";
import { ItemImage } from "../modules/items/entities/item-images.entity";
import { Item } from "../modules/items/entities/items.entity";
import { FeatureSettings } from "../modules/fetaure-settings/entities/feature-setting.entity";
import { FeatureCodes } from "../modules/fetaure-settings/entities/feature-codes.entity";
import { UserSessions } from "../modules/auth/entities/user-sessions.entity";
import { Users } from "../modules/auth/entities/user.entity";
import { SaleHeaders } from "../modules/sale-items/entities/sale-header.entity";
import { SaleLines } from "../modules/sale-items/entities/sale-lines.enity";
import { Taxes } from "../modules/taxes/entities/taxes.entity";
import { PurchaseHeaders } from "../modules/purchase-items/entities/purchase-headers.entity";
import { PurchaseLines } from "../modules/purchase-items/entities/purchase-lines.entity";
import { InventoryLines } from "../modules/sale-items/entities/inventory-lines.entity";
import { Supplier } from "../modules/suppliers/entities/supplier.entity";
import { ItemAvailable } from "../modules/sale-items/entities/item-stocks.entity";
import { Services } from "../modules/services/entities/services.entity";
import { ItemsStockTrack } from "../modules/purchase-items/entities/item-stock-track.entity";
import { Contact } from "../modules/contacts/entities/contact.entity";

export const entities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [
  Item,
  ItemImage,
  ItemDescription,
  City,
  Country,
  States,
  DUserType,
  DPaymentType,
  DFeatureType,
  Customer,
  FeatureSettings,
  Menus,
  FeatureCodes,
  UserSessions,
  Users,
  Services,
  SaleHeaders,
  SaleLines,
  Taxes,
  PurchaseHeaders,
  PurchaseLines,
  InventoryLines,
  Supplier,
  ItemAvailable,
  DItemType,
  ItemsStockTrack,
  DContactType,
  Contact,
  DDateRangeType
];
