import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import service from "./stock-adjustment-headers.service";
import { StockAdjustmentHeaders } from "./entities/stock-adjustment-headers.entity";
import authenticateToken from "../../middlewares/authenticate.middleware";
import path from "path";
const router = Router();
import ejs from "ejs";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { stockAdjustmentSchema } from "../../schema/stock-adjustment.schema";
import getQuerySecure from "../../utils/get-query-secure.util";
router.get(
  "/",
  authenticateToken,
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
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.findStocks(
        await getQuerySecure(req, StockAdjustmentHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/stocks-download",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await service.exportUsersToExcel(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   "/",
//   authenticateToken,
//   validateRequestBody(StockAdjustmentHeaders),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await service.create(req.body);
//       res.send(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
//render html for stock stickers
router.get(
  "/stock-stckers-download/:id",
  //   authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const invoiceData = await service.findStockByPurchase(id);
      // Path to your EJS template file
      const renderedPath = path.join(
        process.cwd(),
        "/dist/app/templates",
        "stocks.template.ejs"
      );
      // Render the EJS template to HTML
      const renderedHtml = await ejs.renderFile(renderedPath, {
        data: invoiceData,
      });
      res.send(renderedHtml);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  authenticateToken,
  validateBodyManual(stockAdjustmentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.create(req, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/stock-adjustment-headers", router);
