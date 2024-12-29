import { handler } from "../config/dbconfig";
import {
  Between,
  EntityTarget,
  Equal,
  FindManyOptions,
  FindOptions,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from "typeorm";
import { sanitizeFilterObject } from "./validate-filter.util";
import { RelationType } from "../types";

const convertWhereObject = (where: object): object => {
  const result = {};
  //1. return normal properties
  //2. check if we have advanced properties
  for (let [key, value] of Object.entries(where)) {
    if (key === "$a") {
      for (let [key1, value1] of Object.entries(where["$a"])) {
        //1.not equal to operator
        if (key1 === "neq") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value ? (result[level3Key] = Not(level3Value)) : null;
          }
        }
        //2. equal to operator
        else if (key1 === "eq") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value ? (result[level3Key] = Equal(level3Value)) : null;
          }
        }
        //3. morethan to operator
        else if (key1 === "mt") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value ? (result[level3Key] = MoreThan(level3Value)) : null;
          }
        }
        //4. morethan to operator
        else if (key1 === "mte") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value
              ? (result[level3Key] = MoreThanOrEqual(level3Value))
              : null;
          }
        }
        //5. less than to operator
        else if (key1 === "lt") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value ? (result[level3Key] = LessThan(level3Value)) : null;
          }
        }
        //6. less than to operator
        else if (key1 === "lte") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value
              ? (result[level3Key] = LessThanOrEqual(level3Value))
              : null;
          }
        }
        //7. like operator
        else if (key1 === "like") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value
              ? (result[level3Key] = Like(
                  "%" +
                    `${level3Value}`.replace(/[.*+?^${}()|[\]\\&%#@!]/g, "") +
                    "%"
                ))
              : null;
          }
        }
        //8. ilike operator
        else if (key1 === "like") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value
              ? (result[level3Key] = ILike(
                  "%" +
                    `${level3Value}`.replace(/[.*+?^${}()|[\]\\&%#@!]/g, "") +
                    "%"
                ))
              : null;
          }
        }
        //9. in operator
        else if (key1 === "in") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value && Array.isArray(level3Value)
              ? (result[level3Key] = In(level3Value))
              : null;
          }
        }
        //10. not in operator
        else if (key1 === "nin") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            level3Value && Array.isArray(level3Value)
              ? (result[level3Key] = Not(In(level3Value)))
              : null;
          }
        } //11. between
        else if (key1 === "between") {
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][key1]
          )) {
            if (Array.isArray(level3Value) && level3Value.length === 2) {
              result[level3Key] = Between(level3Value[0], level3Value[1]);
            }
          }
        }

        //13. null
        else {
        }
      }
    } else {
      result[key] = value;
    }
  }

  return result;
};
const createSelectObject = (
  obj: {
    name?: string;
    fields?: object;
    where?: object;
    order?: object;
    relations?: RelationType[];
  },
  name?: string
) => {
  let selectObj = {};
  let relationObj = {};
  let whereObj = {};
  let orderObj = {};
  if (obj?.fields) {
    selectObj = obj?.fields;
  }
  if (obj?.order) {
    orderObj = obj?.order;
  }
  if (obj.where) {
    //convert where object here
    whereObj = convertWhereObject(obj.where);
  }
  if (obj?.relations) {
    for (const relation of obj?.relations) {
      if (relation.name && relation?.fields) {
        relationObj[relation.name] = true;
        let [resposelect, respoRelation, respoWhere, respoOrder] =
          createSelectObject(relation, relation.name);
        //add relation object
        relationObj[relation.name] = Object.keys(respoRelation).length
          ? respoRelation
          : true;
        //add select object
        if (Object.keys(resposelect)?.length) {
          selectObj[relation.name] = resposelect;
        }
        //add where object
        if (Object.keys(respoWhere)?.length) {
          whereObj[relation.name] = respoWhere;
        }
        //add where object
        if (Object.keys(respoOrder)?.length) {
          orderObj[relation.name] = respoOrder;
        }
      }
    }
  }
  return [selectObj, relationObj, whereObj, orderObj];
};

export const queryBuilder = async <T extends EntityTarget<T>>(
  query: {
    name?: string;
    fields?: object;
    where?: object;
    relations?: RelationType[];
    skip?: number;
    limit?: number;
  },
  model: T
): Promise<FindManyOptions<any>> => {
  //a. sanitize relations filter
  const appDataSource = await handler();
  const entityMetadata = appDataSource.getMetadata(model);
  //b. create relationNameto model properties mapping
  const resultMapping = {};
  resultMapping["baseModel"] = entityMetadata.targetName;
  entityMetadata.relations.forEach((relation) => {
    resultMapping[relation.propertyName] =
      relation.inverseEntityMetadata.targetName;
  });
  //c. take sanitized data back
  const finalFilter = await sanitizeFilterObject(query, resultMapping);
  //d. create object from filter
  //consist for three things
  const [select, relations, where, order] = createSelectObject(finalFilter);
  return {
    ...(Object.keys(select).length ? { select } : {}),
    ...(Object.keys(relations).length ? { relations } : {}),
    ...(Object.keys(where).length ? { where } : {}),
    ...(Object.keys(order).length ? { order } : {}),
    ...(query.skip ? { skip: query.skip } : {}),
    ...(query.limit ? { take: query.limit } : {}),
  };
};

//sample where object
//ref-: https://orkhan.gitbook.io/typeorm/docs/find-options
const where = {
  $a: {
    //1. not equal to
    neq: {
      property: "value",
    }, //6. less than eqaul
    mte: {
      property: "value",
    },
    //2. not include
    nin: {
      property: [1, 2, 3, 4, 5],
    },
    //3. less than
    lt: {
      property: "value",
    },
    //4. less than eqaul
    lte: {
      property: "value",
    },
    //5. less than
    mt: {
      property: "value",
    },
    //6. eqaul to
    eq: {
      property: "value",
    },
    //7. like
    like: {
      property: "value",
    },
    //8. like case insensetive
    ilike: {
      property: "value",
    },
    between: {
      property: ["start", "end"],
    },
    in: {
      property: ["start", "end"],
    },
    isNull: {
      properties: ["start", "end"],
    },
  },
};
