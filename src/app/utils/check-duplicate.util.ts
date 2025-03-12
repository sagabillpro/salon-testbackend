import { Not, EntityTarget, ObjectLiteral } from "typeorm";
import { handler } from "../config/dbconfig";
import { Company } from "../modules/company/entities/company.entity";

/**
 * Checks for duplicate records based on unique constraints of the entity.
 *
 * @param data - The data object containing the fields to check.
 * @param model - The entity (model) to check against.
 * @returns A duplicate record if found, otherwise null.
 */
export const checkUniqueConstraints = async <T extends EntityTarget<T>>(
  data: any,
  model: EntityTarget<ObjectLiteral>
): Promise<void> => {
  // 1. Get the data source and repository for the model.
  const dataSource = await handler();
  const repo = dataSource.getRepository(model);

  // 2. Retrieve the entity metadata from the data source.
  const entityMetadata = dataSource.getMetadata(model);
  //   entityMetadata.ownColumns.forEach((column) => {

  //   });
  // 3. Extract columns that have unique constraints.
  const uniqueColumns = entityMetadata.columns.filter((column) => column);
  let uniqueColumnNames = Array.from(
    new Set(
      entityMetadata.uniques.flatMap((uniqueMeta) =>
        uniqueMeta.columns.map((col) => col.propertyName)
      )
    )
  );
  uniqueColumnNames = uniqueColumnNames.filter((prop) => prop !== "code");
  // If no unique columns are defined, there is nothing to check.
  if (!uniqueColumns.length) return;

  // 4. Build an array of conditions.
  // Each condition includes the unique field value from data, and also excludes the current record (if an id is provided).
  const conditions = uniqueColumns.reduce((acc, column) => {
    const prop = column.propertyName;
    //   if (data[prop] !== undefined) {
    if (uniqueColumnNames.includes(prop) && data[prop] && prop !== "code") {
      const condition: any = {
        [prop]: data[prop],
      };
      // Exclude current record if updating an existing record.
      if (data.id !== undefined) {
        condition.id = Not(data.id);
      }
      acc.push(condition);
    }
    return acc;
  }, [] as any[]);
  if (conditions.length === 0) return;

  // 5. Query the repository with an OR condition across all unique fields.
  // This means if any unique field matches (while excluding the current record), a duplicate is found.
  const duplicate = await repo.findOne({ where: conditions });
  if (duplicate) {
    throw {
      message:
     `Duplicate record in ${entityMetadata.targetName}, please try again!. Name ,Registration Number ,Phone Number ,Email should be unique.`,
      data: uniqueColumnNames,
      statusCode: 409,
    };
  }
};
