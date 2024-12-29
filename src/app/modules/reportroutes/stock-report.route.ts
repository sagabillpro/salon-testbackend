import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { ItemsStockTrack } from "../purchase-items/entities/item-stock-track.entity";
import { handler } from "../../config/dbconfig";

const router = Router();

router.get(
  "/",
  validateFilter(ItemsStockTrack),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataSource = await handler();
      const repo = dataSource.getRepository(ItemsStockTrack);
      const result = await repo.find(await getQuery(req, ItemsStockTrack));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/item-stock-report", router);
