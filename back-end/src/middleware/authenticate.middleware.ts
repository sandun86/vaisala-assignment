import { Request, Response, NextFunction } from "express";
import { HTTP_CODES, API_KEY } from "../config/variables";

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers['x-api-key'] !== API_KEY) {
        console.error("Authentication failed");
        res.status(HTTP_CODES.UNAUTHORIZED).json({ message: "Authentication failed.!" });
        return;
    }
    next();
};


