import {Request} from "express";


export default (request: Request, paramsToCheck: string[]) : {valid:boolean, error:string} => {
    const errors: string[] = [];
    for (let param of paramsToCheck) {
        if (!request.body.hasOwnProperty(param)) {
            errors.push(param);
        }
    }
    if (errors.length != 0) return {valid: false, error: `fields: [${errors}] missing from request body`}
    return {valid: true, error: ""};
}