import { EntityTarget } from "typeorm";
import { CompanyHistory, ContactHistory, ServicesHistory, UsersHistory } from "../history-entities";

export const routeToEntityMap: {
  [key: string]: EntityTarget<any>;
} = {
  "/company-history": CompanyHistory,
  "/contact-history": ContactHistory,
  "/services-history": ServicesHistory,
  "/users-history": UsersHistory,
};
