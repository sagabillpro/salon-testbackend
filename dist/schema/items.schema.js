"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
exports.Items = {
    type: "object",
    properties: {
        name: { type: "string" },
        id: { type: "number" },
        discount: { type: "number" },
        code: { type: "string" },
        description: { type: "string" },
        isInactive: { type: "number" },
        salePrice: { type: "number" },
        dimension: { type: "string" },
        modifiedDate: { type: "string", format: "date-time" },
        createdDate: { type: "string", format: "date-time" },
        revisionNumber: { type: "number" },
        // itemImages:{type:"arra}
    },
    required: ["name", "code", "salePrice", "dimension"],
    additionalProperties: false,
};
//# sourceMappingURL=items.schema.js.map