import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");


export default (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from headers
        const token = req.headers.authorization.split(" ")[1];

        // Get 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const uuid = decoded.id;
        
        req.user = uuid;
        next();
    } catch (error) {
        res.status(401).json({error});

    }
}