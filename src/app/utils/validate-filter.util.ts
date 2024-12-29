import { NextFunction } from "express";
import { EntityTarget } from "typeorm";
import { Request, Response } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { FilterSchema } from "../schema";
import { handler } from "../config/dbconfig";
import { RelationType } from "../types";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

//2. get relation names relations
const getRelationNames = async <T extends EntityTarget<T>>(
  model: T,
  baseModelName?: string,
  level: number = 1
): Promise<string[]> => {
  let relationArray: string[] = [];
  try {
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);

    const relations = entityMetadata.relations.map((relation) => {
      return {
        propertyName: relation.propertyName,
        relationType: relation.relationType,
        className: relation.inverseEntityMetadata.targetName,
      };
    });

    //3. loop through relations and crate a scheama for each relation entity
    for (const relation of relations) {
      if (baseModelName !== relation.className && level < 5) {
        //a. get the scheama oject for that entity
        relationArray.push(relation.propertyName);
        const result = await getRelationNames(
          relation.className,
          baseModelName,
          level++
        );
        relationArray = [...relationArray, ...result];
      } else {
        relationArray.push(relation.propertyName);
      }
    }
    return Array.from(new Set(relationArray));
  } catch (e) {
    throw e;
  }
};
//3.function which can validate relations passes
const validateFilterRelations = async (
  checkArray: string[],
  relationArray?: RelationType[]
): Promise<void> => {
  try {
    relationArray?.forEach((val) => {
      if (val?.name) {
        if (val?.name && checkArray.includes(val?.name)) {
          if (val.relations) {
            validateFilterRelations(checkArray, val.relations);
          }
        } else {
          const error = {
            status: 400,
            message: `Invalid relation name '${val?.name}' provided.`,
            errorCode: "INVALID_RELATION_NAME",
            availableRelations: checkArray,
          };
          throw error;
        }
      }
    });
  } catch (e) {
    throw e;
  }
};

//4.filter out malicious properties from object
const checkModelProperties = async <T extends EntityTarget<T>>(
  model: T,
  fields: object
): Promise<object> => {
  try {
    const result: object = {};
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    //2. get model properties
    const modelProperties = {};
    entityMetadata.ownColumns.forEach((column) => {
      modelProperties[column.propertyName] = true;
    });
    Object.keys(fields).map((key) => {
      if (modelProperties[key]) {
        result[key] = true;
      }
    });
    return result;
  } catch (e) {
    throw e;
  }
};

//4.filter out malicious properties from order object
const checkModelOrder = async <T extends EntityTarget<T>>(
  model: T,
  order: object
): Promise<object> => {
  try {
    const result: object = {};
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    //2. get model properties
    const modelProperties = {};
    entityMetadata.ownColumns.forEach((column) => {
      modelProperties[column.propertyName] = true;
    });
    Object.keys(order).map((key) => {
      if (modelProperties[key] && ["asc", "desc"].includes(order[key])) {
        result[key] = order[key];
      }
    });
    return result;
  } catch (e) {
    throw e;
  }
};

//5. checkModelPropertiesWhere
const checkModelPropertiesWhere = async <T extends EntityTarget<T>>(
  model: T,
  where: object
): Promise<object> => {
  const result = {};
  //1. get the datasource object
  const appDataSource = await handler();
  const entityMetadata = appDataSource.getMetadata(model);
  //2. get model properties
  const modelProperties = {};
  entityMetadata.ownColumns.forEach((column) => {
    modelProperties[column.propertyName] = true;
  });
  // Object.keys(where).map((key) =>
  for (let [level1Key, level1Value] of Object.entries(where)) {
    if (modelProperties[level1Key]) {
      result[level1Key] = level1Value;
    } else if (level1Key === "$a") {
      let level2Result = {};
      //1.validate advanced where options
      Object.keys(where["$a"]).map((level2Key) => {
        if (
          [
            "eq",
            "neq",
            "mte",
            "in",
            "nin",
            "lt",
            "lte",
            "mt",
            "mte",
            "like",
            "ilike",
            "between"
          ].includes(level2Key)
        ) {
          let level3Result = {};
          //get key and values from inner object
          for (let [level3Key, level3Value] of Object.entries(
            where["$a"][level2Key]
          )) {
            modelProperties[level3Key]
              ? (level3Result[level3Key] = level3Value)
              : null;
          }
          //assign to main object
          level2Result[level2Key] = level3Result;
        } else if (level2Key === "between") {

        } else if (level2Key === "isNull") {
        }
      });
      //assign the main advanced where object to maoin where
      result[level1Key] = level2Result;
    }
  }
  return result;
};

export const sanitizeFilterObject = async <T extends EntityTarget<T>>(
  // model: T,
  filter: {
    name?: string;
    fields?: object;
    where?: object;
    order?: object;
    relations?: RelationType[];
  },
  mapping: {
    [key: string]: string;
  },
  level = 1
): Promise<{
  name?: string;
  fields?: object;
  where?: object;
  order?: object;
  relations?: RelationType[];
}> => {
  // Process fields
  try {
    let processedFields = {};
    let processedWhere = {};
    let processedOrder = {};
    if (filter.fields) {
      if (level === 1) {
        processedFields = await checkModelProperties(
          mapping["baseModel"],
          filter.fields
        );
      } else {
        if (filter.name && mapping[filter.name]) {
          processedFields = await checkModelProperties(
            mapping[filter.name],
            filter.fields
          );
        }
      }
      //check if the property present inside the model
    }
    if (filter.where) {
      if (level === 1) {
        processedWhere = await checkModelPropertiesWhere(
          mapping["baseModel"],
          filter.where
        );
      } else {
        if (filter.name && mapping[filter.name]) {
          processedWhere = await checkModelPropertiesWhere(
            mapping[filter.name],
            filter.where
          );
        }
      }
    }
    //check for order object
    if (filter.order) {
      if (level === 1) {
        processedOrder = await checkModelOrder(
          mapping["baseModel"],
          filter.order
        );
      } else {
        if (filter.name && mapping[filter.name]) {
          processedOrder = await checkModelOrder(
            mapping[filter.name],
            filter.order
          );
        }
      }
      //check if the property present inside the model
    }
    // Process where
    const processedRelations: {
      name?: string;
      fields?: object;
      where?: object;
      order?: object;
      relations?: RelationType[];
    }[] = [];

    if (filter.relations) {
      for (const relation of filter.relations) {
        const sanitizedRelation = await sanitizeFilterObject(
          relation,
          mapping,
          level + 1
        );
        processedRelations.push(sanitizedRelation);
      }
    }

    return {
      ...(filter.name ? { name: filter.name } : {}),
      fields: processedFields,
      relations: processedRelations,
      where: processedWhere,
      order: processedOrder,
    };
  } catch (e) {
    throw e;
  }

  // return result;
}; //1. validate params filter
export const validateFilter = <T extends EntityTarget<T>>(model: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.filter) {
        const query: {
          fields?: object;
          where?: object;
          relations?: RelationType[];
        } = JSON.parse(`${req.query.filter}`);
        //a. validate fiilter scheama body
        const validate = ajv.compile(FilterSchema);
        const valid = validate(query);
        if (!valid) {
          throw validate.errors;
        }

        //b. validate relation names
        const appDataSource = await handler();

        const entityMetadata = appDataSource.getMetadata(model);

        const relationList = await getRelationNames(
          model,
          entityMetadata.targetName
        );

        //b1.check whether user passed anonymus relations
        await validateFilterRelations(relationList, query.relations);
      }

      next();
    } catch (error) {
      res.status(422).json(error);
    }
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
