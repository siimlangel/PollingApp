import Controller from "./Controller";

export default interface Route {
    method: string,
    route: string,
    controller: Controller,
    action: string,
    error: string,
    auth?: boolean
}