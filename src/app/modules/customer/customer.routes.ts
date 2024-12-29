import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Customer } from "./entities/customer.entity";
import customerService from "./customer.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
const router = Router();

router.get(
  "/",
  validateFilter(Customer),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await customerService.find(await getQuery(req, Customer));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(Customer),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await customerService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validateFilter(Customer),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await customerService.findById(
        id,
        await getQuery(req, Customer)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(Customer),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await customerService.updateById(id, req.body);
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
      await customerService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/customers", router);
