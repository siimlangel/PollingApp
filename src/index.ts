import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import Routes from "./routes";
import handleRouteReject from "./Utility/RouteRejectHandler";
import authMiddleware from "./middleware/auth";
require("dotenv").config();

createConnection().then(async connection => {

    
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        // Apply auth middleware
        const middleware = route.auth ? authMiddleware: [];
        // i.e. app["get"]("/users", (req, res, next))
        (app as any)[route.method](route.route, middleware, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            
            if (result instanceof Promise) {
                result
                .then(result => {
                    result !== null && result !== undefined ? res.send(result) : res.status(500).send(route.error)
                })
                .catch(result => handleRouteReject(result, res));

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    

    
    // start express server
    app.listen(process.env.PORT || 3006);
    
    
    
    console.log("Express server has started on port 3006. Open http://localhost:3006/users to see results");
}).catch(error => console.log(error));
