import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import UOMService from "./uom.service";
import { UOM } from "./entities/uom.entity";
import authenticateToken from "../../middlewares/authenticate.middleware";
// import wkhtmltopdf from "wkhtmltopdf";
const router = Router();

router.get(
  "/",
  validateFilter(UOM),
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UOMService.find(await getQuery(req, UOM));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(UOM),
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UOMService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validateFilter(UOM),
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await UOMService.findById(id, await getQuery(req, UOM));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(UOM),
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await UOMService.updateById(id, req.body);
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
      await UOMService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/uom", router);
