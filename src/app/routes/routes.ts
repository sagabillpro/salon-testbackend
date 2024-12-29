import cors from "cors";
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  static as static_,
} from "express";
import { ResponseHandler } from "../utils/response.handler.util";
import { routes } from "./routes.data";
import { API_BASE } from "../utils/constant";

/**
 * An utility function to register all the routes and middlewares
 *
 * @param app
 * @returns void
 */
export const registerRoutes = (app: Application) => {
  /**
   * All global level middlewares goes here
   */
  app.use(cors());
  app.use(json({ limit: "10mb" }));
  app.use(static_("app/public"));

  /**
   * Register all the paths
   */
  for (let route of routes) {
    app.use(API_BASE + route.path, route.router);
  }
  /**
   * Middleware to handel any exception in any route
   */
//   app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     try{
        
//     }
//     catch(err){

//     }
//   });
};
