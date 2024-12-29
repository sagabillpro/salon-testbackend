"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionTypes = void 0;
exports.DescriptionTypes = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        description: { type: "string" },
        modifiedDate: { type: "string", format: "date-time" },
        createdDate: { type: "string", format: "date-time" },
        revisionNumber: { type: "number" },
    },
    required: ["name"],
    additionalProperties: false,
};
//# sourceMappingURL=description-type.schema.js.map