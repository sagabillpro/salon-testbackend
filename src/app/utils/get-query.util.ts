import { Request } from "express";
import { RelationType } from "../types";
import { queryBuilder } from "./query-builder";
import { EntityTarget, FindManyOptions } from "typeorm";

export default async function getQuery<T extends EntityTarget<T>>(
  req: Request,
  model: T
): Promise<FindManyOptions<any> | FindManyOptions<any>> {
  const query: {
    fields?: object;
    where?: object;
    relations?: RelationType[];
    skip?: number;
    limit?: number;
  } = req.query.filter ? JSON.parse(`${req.query.filter}`) : {};
  const filterobj = await queryBuilder<typeof model>(query, model);
  return filterobj;
}
