import { JSONSchemaType } from "ajv";

export const NewRefreshToken: JSONSchemaType<{
    token: string;
}> = {
    type: "object",
    properties: {
        token: {
            type: "string",
        }
    },
    required: ["token"],
    additionalProperties: false,
};
