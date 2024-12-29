import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";

import { validateBodyManual } from "../../utils/validate-req-body.util";
import { SaleHeadersSchema } from "../../schema/sale-header.schema";
import serviceSessionService from "./service-session.service";
import { validateFilter } from "../../utils/validate-filter.util";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";
import getQuery from "../../utils/get-query.util";
const router = Router();
router.get(
  "/",
  validateFilter(SaleHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await serviceSessionService.find(
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
      console.log("inside thus 1")
      const result = await serviceSessionService.create(req.body);
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
      await serviceSessionService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/service-sessions", router);
