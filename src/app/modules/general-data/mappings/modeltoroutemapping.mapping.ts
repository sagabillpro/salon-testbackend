import { EntityTarget } from "typeorm";
import {
  City,
  Country,
  DFeatureType,
  DItemType,
  DPaymentType,
  DUserType,
  Menus,
  States,
  DContactType,
  DDateRangeType,
  DIndustryType,
  DTransactionStatus,
  DCoupounType,
} from "../entities";

export const routeToEntityMap: {
  [key: string]: EntityTarget<any>;
} = {
  "/user-types": DUserType,
  "/feature-types": DFeatureType,
  "/payment-types": DPaymentType,
  "/cities": City,
  "/states": States,
  "/countries": Country,
  "/menus": Menus,
  "/item-types": DItemType,
  "/contact-types": DContactType,
  "/date-range-types": DDateRangeType,
  "/industry-types": DIndustryType,
  "/transaction-status": DTransactionStatus,
  "/coupons-types": DCoupounType,
};
