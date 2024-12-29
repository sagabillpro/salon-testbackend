"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSchema = void 0;
var relations_filter_schema_1 = require("./relations-filter.schema");
exports.FilterSchema = {
    type: "object",
    properties: {
        fields: {
            type: "object",
            nullable: true,
        },
        where: {
            type: "object",
            nullable: true,
        },
        relations: {
            type: "array",
            items: relations_filter_schema_1.RelationsFilter,
            nullable: true,
        },
    },
    required: [],
    // additionalProperties: false,
};
//# sourceMappingURL=filter.schema.js.map