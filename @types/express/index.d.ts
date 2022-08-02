import { Express, Request } from "express-serve-static-core";
import { User } from "../../src/database/schemas/user";
 
declare module "express-serve-static-core" {
    interface Request {
      user: User & Express.User;
    }
}