import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import saleHeaderService from "./sale-header.service";
import { SaleHeaders } from "./entities/sale-header.entity";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { SaleHeadersSchema } from "../../schema/sale-header.schema";
const router = Router();

router.get(
  "/",
  validateFilter(SaleHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await saleHeaderService.find(
        await getQuery(req, SaleHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateBodyManual(SaleHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await saleHeaderService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  // validateFilter(SaleHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await saleHeaderService.findById(
        id,
        await getQuery(req, SaleHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateBodyManual(SaleHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await saleHeaderService.updateById(id, req.body);
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
      await saleHeaderService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/bulk",
  validateBodyManual(SaleHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await saleHeaderService.createBulk(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/sale-headers", router);
