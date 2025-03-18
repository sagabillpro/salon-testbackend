"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorksheetColumnsFromSchema = void 0;
var entity_report_headers_mapping_1 = __importDefault(require("../mappings/entity-report-headers.mapping"));
var getWorksheetColumnsFromSchema = function (schemaKey, worksheet, data) {
    var schema = entity_report_headers_mapping_1.default[schemaKey];
    if (!schema || !schema.tableHeader) {
        return []; // Or handle error appropriately, e.g., throw an error
    }
    var columns = schema.tableHeader.map(function (headerConfig) { return ({
        header: headerConfig.header,
        key: headerConfig.accessorKey,
        width: 20, // Default width, you can adjust as needed
    }); });
    worksheet.columns = columns;
    // 4. Add data to the worksheet dynamically
    data.forEach(function (value) {
        var row = {}; // Create an empty object for the row
        // Iterate through the column definitions to dynamically build the row
        columns.forEach(function (columnConfig) {
            var accessorKey = columnConfig.key; // Get the accessorKey from column config
            var cellValue;
            // Handle nested accessor keys (like 'service.name')
            if (accessorKey.includes(".")) {
                var keys = accessorKey.split(".");
                var nestedValue = value; // Start with the value object
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if (nestedValue && nestedValue.hasOwnProperty(key)) {
                        nestedValue = nestedValue[key]; // Traverse down the nested path
                    }
                    else {
                        nestedValue = undefined; // Handle cases where path doesn't exist
                        break;
                    }
                }
                cellValue = nestedValue; // Assign the final nested value
            }
            else {
                cellValue = value[accessorKey]; // Direct property access
            }
            row[columnConfig.key] = cellValue; // Assign the value to the column key in the row
        });
        worksheet.addRow(row); // Add the dynamically created row to the worksheet
    });
    return worksheet;
};
exports.getWorksheetColumnsFromSchema = getWorksheetColumnsFromSchema;
//# sourceMappingURL=get-report-headers.util.js.map