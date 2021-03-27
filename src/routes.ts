import * as fs from "fs";
import * as path from "path";
import Route from "./Interfaces/Route";

let Routes: Route[] = [];

// Read in every route
fs.readdirSync(path.resolve(__dirname, "routes")).forEach(file => {
    Routes = [...Routes, ...require(path.resolve(__dirname, "routes", file))];
});


export default Routes;