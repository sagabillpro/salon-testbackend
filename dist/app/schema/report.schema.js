"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchema = void 0;
exports.ReportSchema = {
    type: "object",
    properties: {
        where: {
            type: "object",
            nullable: true,
            properties: {
                startDate: {
                    type: "string",
                    format: "date-time",
                    nullable: true, // Allow `null` for `startDate`
                },
                endDate: {
                    type: "string",
                    format: "date-time",
                    nullable: true, // Allow `null` for `endDate`
                },
            },
            required: [], // No properties are required inside `where`
        },
        limit: { type: "number", nullable: true },
        skip: { type: "number", nullable: true }, // Allow `null` for `skip`
    },
    required: [],
    additionalProperties: false, // Prevent extra properties
};
//# sourceMappingURL=report.schema.js.map