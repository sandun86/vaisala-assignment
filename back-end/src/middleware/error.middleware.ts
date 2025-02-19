import { Request, Response, NextFunction } from "express";
import { HTTP_CODES } from "../config/variables";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(HTTP_CODES.SERVER_ERROR).json({ error: "Something went wrong!" });
};
