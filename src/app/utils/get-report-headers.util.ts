import FilterSchemaMapping from "../mappings/entity-report-headers.mapping";

export const getWorksheetColumnsFromSchema = (
  schemaKey: number,
  worksheet: any,
  data: any
): any => {
  const schema = FilterSchemaMapping[schemaKey];
  if (!schema || !schema.tableHeader) {
    return []; // Or handle error appropriately, e.g., throw an error
  }
  const columns = schema.tableHeader.map((headerConfig: any) => ({
    header: headerConfig.header,
    key: headerConfig.accessorKey,
    width: 20, // Default width, you can adjust as needed
  }));
  worksheet.columns = columns;

  // 4. Add data to the worksheet dynamically
  data.forEach((value: any) => {
    const row = {}; // Create an empty object for the row

    // Iterate through the column definitions to dynamically build the row
    columns.forEach((columnConfig: any) => {
      const accessorKey = columnConfig.key; // Get the accessorKey from column config
      let cellValue: any;

      // Handle nested accessor keys (like 'service.name')
      if (accessorKey.includes(".")) {
        const keys = accessorKey.split(".");
        let nestedValue = value as any; // Start with the value object
        for (const key of keys) {
          if (nestedValue && nestedValue.hasOwnProperty(key)) {
            nestedValue = nestedValue[key]; // Traverse down the nested path
          } else {
            nestedValue = undefined; // Handle cases where path doesn't exist
            break;
          }
        }
        cellValue = nestedValue; // Assign the final nested value
      } else {
        cellValue = value[accessorKey as keyof any]; // Direct property access
      }

      row[columnConfig.key] = cellValue; // Assign the value to the column key in the row
    });

    worksheet.addRow(row); // Add the dynamically created row to the worksheet
  });
  return worksheet;
};
