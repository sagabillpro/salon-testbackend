import Ajv, { JSONSchemaType } from "ajv";
import { NextFunction, Request, Response } from "express";
import addFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
export const validateBodyManual = <T>(scheama: JSONSchemaType<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //a. validate fiilter scheama body
      const validate = ajv.compile(scheama);
      const valid = validate(req.body);
      if (!valid) {
        throw validate.errors;
      }
      next();
    } catch (error) {
      res.status(422).json(error);
    }
  };
};
