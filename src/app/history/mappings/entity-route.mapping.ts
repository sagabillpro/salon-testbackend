import { EntityTarget } from "typeorm";
import { CompanyHistory } from "../history-entities";

export const routeToEntityMap: {
  [key: string]: EntityTarget<any>;
} = {
  "/company-history": CompanyHistory,
};
