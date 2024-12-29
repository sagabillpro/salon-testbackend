"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSchema = void 0;
var relations_filter_schema_1 = require("./relations-filter.schema");
exports.FilterSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            nullable: true,
        },
        fields: {
            type: "object",
            nullable: true,
        },
        where: {
            type: "object",
            nullable: true,
            properties: {
                $a: {
                    type: "object",
                    nullable: true,
                    properties: {
                        neq: {
                            type: "object",
                            nullable: true,
                        },
                        eq: {
                            type: "object",
                            nullable: true,
                        },
                        mt: {
                            type: "object",
                            nullable: true,
                        },
                        mte: {
                            type: "object",
                            nullable: true,
                        },
                        lt: {
                            type: "object",
                            nullable: true,
                        },
                        lte: {
                            type: "object",
                            nullable: true,
                        },
                        like: {
                            type: "object",
                            nullable: true,
                        },
                        ilike: {
                            type: "object",
                            nullable: true,
                        },
                        // in: {
                        //   type: "array",
                        //   //   items: [{ type: "integer" }, { type: "integer" }],
                        //   minItems: 2,
                        //   //   additionalItems: false,
                        //   nullable: true,
                        // },
                        // nin: {
                        //   type: "array",
                        //   //   items: [{ type: "integer" }, { type: "integer" }],
                        //   // minItems: 2,
                        //   //   additionalItems: false,
                        //   nullable: true,
                        // },
                        // between: {
                        //   type: "array",
                        //   //   items: [{ type: "integer" }, { type: "integer" }],
                        //   minItems: 2,
                        //   additionalItems: false,
                        //   nullable: true,
                        // },
                        in: {
                            type: "object",
                            //   properties: {
                            //     ".*": {
                            //       type: "array",
                            //       items: { type: "integer" },
                            //       nullable: true,
                            //     },
                            //   },
                            //   additionalProperties: false,
                            //   nullable: true,
                        },
                        nin: {
                            type: "object",
                            //   items: { type: "integer" },
                            //   // minItems: 2,
                            //   // maxItems: 2,
                            //   nullable: true,
                        },
                        between: {
                            type: "object",
                            //   items: { type: "integer" },
                            //   minItems: 2,
                            //   maxItems: 2,
                            //   additionalItems: false, // No additional items beyond specified two
                            nullable: true,
                        },
                    },
                    additionalProperties: true,
                },
            },
        },
        order: {
            type: "object",
            nullable: true,
        },
        relations: {
            type: "array",
            items: relations_filter_schema_1.RelationsFilter,
            nullable: true,
        },
        limit: {
            type: "number",
        },
        skip: {
            type: "number",
        },
    },
    required: [],
    additionalProperties: false,
};
//# sourceMappingURL=filter.schema.js.map