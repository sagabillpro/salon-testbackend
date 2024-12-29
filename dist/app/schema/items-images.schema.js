"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemImages = void 0;
exports.ItemImages = {
    type: "object",
    properties: {
        id: { type: "number" },
        url: { type: "string" },
        modifiedDate: { type: "string", format: "date-time" },
        createdDate: { type: "string", format: "date-time" },
        revisionNumber: { type: "number" },
        itemId: { type: "number", nullable: true },
    },
    required: ["url"],
    additionalProperties: false,
};
//# sourceMappingURL=items-images.schema.js.map