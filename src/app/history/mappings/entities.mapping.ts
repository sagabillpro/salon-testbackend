import { EntitySchema, MixedList } from "typeorm";
import { CompanyHistory } from "../history-entities";

export const historyEntities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [CompanyHistory];
