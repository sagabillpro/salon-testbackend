import { Router } from "express";

/**
 * utility class for routes that determines proper structure for a route
 */
export class Route {
  constructor(public path: string, public router: Router) {}
}

/**
 * Type anotation for routes
 */
export type Routes = Route[];
