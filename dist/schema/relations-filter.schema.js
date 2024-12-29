"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsFilter = void 0;
exports.RelationsFilter = {
    type: "object",
    properties: {
        name: {
            type: "string",
            nullable: true,
        },
        where: {
            type: "object",
            nullable: true,
        },
        fields: {
            type: "object",
            nullable: true,
        },
        relations: {
            type: "array",
            nullable: true,
            items: { $ref: "#" },
        },
    },
    required: [],
    // additionalProperties: true,
};
//# sourceMappingURL=relations-filter.schema.js.map