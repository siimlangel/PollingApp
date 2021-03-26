import {UserController} from "../controller/UserController";
import Route from "../Interfaces/Route";

const Routes: Route[] = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    error: "Couldn't find users",
}, {
    method: "get",
    route: "/users/:uuid",
    controller: UserController,
    action: "one",
    error: "Couldn't find user",
    auth: true,
}, {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register",
    error: "Couldn't save user"
}, {
    method: "delete",
    route: "/users/:uuid",
    controller: UserController,
    action: "remove",
    error: "Couldn't remove user"
},
{
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    error: "Couldn't login",
}
];

module.exports = Routes;