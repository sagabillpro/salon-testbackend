import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { UserMenusAndFeatures } from "./entities/usermenufeaturemap.entity";
import UserMenusAndFeaturesService from "./usermenufeaturemap.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
const router = Router();

router.get(
  "/",
  validateFilter(UserMenusAndFeatures),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserMenusAndFeaturesService.find(await getQuery(req, UserMenusAndFeatures));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(UserMenusAndFeatures),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserMenusAndFeaturesService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validateFilter(UserMenusAndFeatures),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await UserMenusAndFeaturesService.findById(
        id,
        await getQuery(req, UserMenusAndFeatures)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(UserMenusAndFeatures),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await UserMenusAndFeaturesService.updateById(id, req.body);
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
      await UserMenusAndFeaturesService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/user-menus-and-features", router);
