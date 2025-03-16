import { EntitySchema, MixedList } from "typeorm";
import { CompanyHistory, ContactHistory, ServicesHistory, UsersHistory } from "../history-entities";

export const historyEntities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [CompanyHistory,ContactHistory,ServicesHistory,UsersHistory];
