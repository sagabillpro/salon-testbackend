import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { CompanyCoupouns } from "./entities/company-coupons.entity";
import CompanyCoupounsService from "./company-coupons.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
const router = Router();

router.get(
  "/",
  // authenticateToken,
  validateFilter(CompanyCoupouns),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CompanyCoupounsService.find(
        await getQuery(req, CompanyCoupouns)
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
  validateRequestBody(CompanyCoupouns),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CompanyCoupounsService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(CompanyCoupouns),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await CompanyCoupounsService.findById(
        id,
        await getQuery(req, CompanyCoupouns)
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
  validateRequestBody(CompanyCoupouns),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await CompanyCoupounsService.updateById(id, req.body);
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
      await CompanyCoupounsService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/send-coupouns/ss",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CompanyCoupounsService.birthdayScheduler();
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/company-coupouns", router);
