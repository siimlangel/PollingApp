import { Response } from "express";


// Handle rejected promises from routes
export default (result, response: Response) => {
    let status = 400;
    let error = "No error provided";

    if (result.status !== undefined) status = result.status;
    if (result.error !== undefined) {
        error = result.error.toString()
        
    } 

    return response.status(status).send({error})
}