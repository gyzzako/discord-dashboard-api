import { NextFunction } from "express";
import { Request, Response } from "express";

export const discordApiTimeout = (req:Request, res: Response, next:NextFunction, ) => {
    setTimeout(() => {
        next();
    }, 100)
}