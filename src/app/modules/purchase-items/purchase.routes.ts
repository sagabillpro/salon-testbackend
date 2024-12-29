import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import purchaseService from "./purchase.service";
import { PurchaseHeaders } from "./entities/purchase-headers.entity";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { PurchaseHeadersSchema } from "../../schema";
const router = Router();

router.get(
  "/",
  validateFilter(PurchaseHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await purchaseService.find(
        await getQuery(req, PurchaseHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateBodyManual(PurchaseHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await purchaseService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  // validateFilter(PurchaseHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await purchaseService.findById(
        id,
        await getQuery(req, PurchaseHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateBodyManual(PurchaseHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await purchaseService.updateById(id, req.body);
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
      await purchaseService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/bulk",
  validateBodyManual(PurchaseHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await purchaseService.createBulk(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/purchase-headers", router);
