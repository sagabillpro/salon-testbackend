import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import service from "./stock-adjustment-headers.service";
import { StockAdjustmentHeaders } from "./entities/stock-adjustment-headers.entity";
const router = Router();

router.get(
  "/",
  validateFilter(StockAdjustmentHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.find(
        await getQuery(req, StockAdjustmentHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/stocks",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.findStocks(
        await getQuery(req, StockAdjustmentHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/stocks-download",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await service.exportUsersToExcel(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(StockAdjustmentHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/stock-adjustment-headers", router);
