import { Request } from "express";
import { AuthenticatedRequest, RelationType } from "../types";
import { queryBuilder } from "./query-builder";
import { EntityTarget, FindManyOptions } from "typeorm";
import { queryBuilderSecure } from "./query-builder-secure.util";

export default async function getQuerySecure<T extends EntityTarget<T>>(
  req: AuthenticatedRequest,
  model: T
): Promise<FindManyOptions<any> | FindManyOptions<any>> {
  const query: {
    fields?: object;
    where?: object;
    relations?: RelationType[];
    skip?: number;
    limit?: number;
  } = req.query.filter ? JSON.parse(`${req.query.filter}`) : {};
  const filterobj = await queryBuilderSecure<typeof model>(req, query, model);
  return filterobj;
}
