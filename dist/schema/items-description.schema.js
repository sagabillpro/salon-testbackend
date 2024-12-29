"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDescriptions = void 0;
exports.ItemDescriptions = {
    type: "object",
    properties: {
        id: { type: "number" },
        label: { type: "string" },
        value: { type: "string" },
        modifiedDate: { type: "string", format: "date-time" },
        createdDate: { type: "string", format: "date-time" },
        revisionNumber: { type: "number" },
        itemId: { type: "number", nullable: true },
        descriptionTypeId: { type: "number" }
    },
    required: ["label", "descriptionTypeId"],
    additionalProperties: false,
};
//# sourceMappingURL=items-description.schema.js.map