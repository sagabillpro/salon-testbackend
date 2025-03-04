"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
exports.UserSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
        },
        code: {
            type: "string",
        },
        name: {
            type: "string",
        },
        userName: {
            type: "string",
        },
        password: {
            type: "string",
        },
        birthDate: {
            type: "string",
        },
        mobile: {
            type: "string",
        },
        email: {
            type: "string",
        },
        isInactive: {
            type: "integer",
        },
        createdDate: {
            type: "string",
            format: "date-time",
        },
        modifiedDate: {
            type: "string",
            format: "date-time",
        },
        userType: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                createdDate: {
                    type: "string",
                    format: "date-time",
                },
                modifiedDate: {
                    type: "string",
                    format: "date-time",
                },
            },
            required: ["id"],
            additionalProperties: false,
        },
        userMenusAndFeatures: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                    },
                    createdDate: {
                        type: "string",
                        format: "date-time",
                    },
                    modifiedDate: {
                        type: "string",
                        format: "date-time",
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    entity: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    feature: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    role: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                },
                required: ["createdDate", "modifiedDate", "entity", "feature"],
                additionalProperties: false,
            },
        },
    },
    required: [
        "name",
        "userName",
        "mobile",
        "isInactive",
        "createdDate",
        "modifiedDate",
        "userMenusAndFeatures",
    ],
    additionalProperties: false,
};
//# sourceMappingURL=user-schema.js.map