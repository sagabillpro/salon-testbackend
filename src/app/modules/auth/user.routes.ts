import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import userService from "./user.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
import { Users } from "./entities/user.entity";
import Ajv from "ajv";
import { LoginSchema } from "../../schema";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { NewRefreshToken } from "../../schema/new-refresh-token.schema";
import { verifyToken } from "../../services";
import { UserSchema } from "../../schema/user-schema";
import authenticateToken from "../../middlewares/authenticate.middleware";
import getQuerySecure from "../../utils/get-query-secure.util";
import { AuthenticatedRequest } from "../../types";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.find(await getQuerySecure(req, Users));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticateToken,
  validateRequestBody(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await userService.findById(id, await getQuery(req, Users));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  validateRequestBody(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await userService.updateById(id, req.body);
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
      await userService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
//bulk create
router.post(
  "/bulk",
  authenticateToken,
  validateRequestBody(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.createBulk(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/bulk/:id",
  authenticateToken,
  validateRequestBody(Users),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await userService.updateById(id, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
//login route
router.post(
  "/login",
  validateBodyManual(LoginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.login(req.body);
      res.send(result);
      next();
    } catch (error) {
      next(error);
    }
  }
);

//regenerate access token
router.post(
  "/new-access-token",
  validateBodyManual(NewRefreshToken),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.generateNewAccessToken(req.body);
      res.send(result);
      next();
    } catch (error) {
      next(error);
    }
  }
);

//logout user
router.post(
  "/logout",
  authenticateToken,
  validateBodyManual(NewRefreshToken),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.logout(req.body);
      res.send(result);
      next();
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/me/data",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // const result = await userService.find(await getQuery(req, Users));
      // const authHeader = req.headers["authorization"];
      // const token = authHeader && authHeader.split(" ")[1];
      // if (!token) {
      //   return res.status(401).json({ message: "Access Token Required" });
      // }
      // // res.send(result);
      // const userData: {
      //   userId: number;
      //   userName: string;
      //   email: string;
      //   userType: {
      //     id: number;
      //     name: string;
      //   };
      // } = await verifyToken(token);
      const userData: any = req?.user;
      // const userData = userService.decodedToken(req, res, next);
      res.send(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
export default new Route("/users", router);
