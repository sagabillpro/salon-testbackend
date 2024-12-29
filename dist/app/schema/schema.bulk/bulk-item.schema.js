"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkItems = void 0;
var schema_1 = require("../../schema");
exports.BulkItems = {
    type: "object",
    properties: {
        item: schema_1.Items,
        itemDescriptions: {
            type: 'array', items: schema_1.ItemDescriptions,
        },
        itemImages: {
            type: 'array', items: schema_1.ItemImages,
        },
    },
    required: ["item", "itemDescriptions", "itemImages"],
    additionalProperties: false,
};
//# sourceMappingURL=bulk-item.schema.js.map