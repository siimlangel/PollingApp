import * as fs from "fs";
import * as path from "path";
import Route from "./Interfaces/Route";

let Routes: Route[] = [];

fs.readdirSync(path.resolve(__dirname, "routes")).forEach(file => {
    Routes = [...Routes, ...require(path.resolve(__dirname, "routes", file))];
});


export default Routes;