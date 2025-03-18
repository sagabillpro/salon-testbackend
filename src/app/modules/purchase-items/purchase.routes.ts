import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import purchaseService from "./purchase.service";
import { PurchaseHeaders } from "./entities/purchase-headers.entity";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { PurchaseHeadersSchema } from "../../schema";
import getQuerySecure from "../../utils/get-query-secure.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
import path from "path";
import ejs from "ejs";

const router = Router();

router.get(
  "/",
    authenticateToken,
  validateFilter(PurchaseHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await purchaseService.find(
        await getQuerySecure(req, PurchaseHeaders)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
    authenticateToken,
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
  authenticateToken,
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
  authenticateToken,
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
  authenticateToken,
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
  authenticateToken,
  validateBodyManual(PurchaseHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await purchaseService.createBulk(req,req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
// router.put(
//   "bulk",
//   validateBodyManual(PurchaseHeadersSchema),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await purchaseService.editBulk(req.body);
//       res.send(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// Add new route for purchase invoice
router.get(
  "/download/generate-invoice/:id",
  //authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const invoiceData = await purchaseService.purchaseInvoiceData(id);
      
      // Render the EJS template
      const templatePath = path.join(__dirname, "../../templates/purchase-invoice.template.ejs");
      const html = await ejs.renderFile(templatePath, invoiceData);
      
      res.send(html);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/purchase-headers", router);
