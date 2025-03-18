import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import featureSettingService from "./feature-setting.service";
import { FeatureSettings } from "./entities/feature-setting.entity";
import authenticateToken from "../../middlewares/authenticate.middleware";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(FeatureSettings),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await featureSettingService.find(await getQuery(req, FeatureSettings));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
    authenticateToken,
  validateRequestBody(FeatureSettings),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await featureSettingService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",   authenticateToken,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await featureSettingService.findById(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authenticateToken,
  validateRequestBody(FeatureSettings),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await featureSettingService.updateById(id, req.body);
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
      await featureSettingService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/feature-settings", router);
