import { JSONSchemaType } from "ajv";

export const LoginSchema: JSONSchemaType<{
  userName: string;
  password: string;
}> = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["userName", "password"],
  additionalProperties: false,
};
