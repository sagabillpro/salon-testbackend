import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Contact } from "./entities/contact.entity";
import ContactService from "./contact.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
const router = Router();

router.get(
  "/",
  validateFilter(Contact),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ContactService.find(await getQuery(req, Contact));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(Contact),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ContactService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validateFilter(Contact),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await ContactService.findById(
        id,
        await getQuery(req, Contact)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(Contact),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await ContactService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await ContactService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/contacts", router);
