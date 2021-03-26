import { PollController } from "../controller/PollController";
import Route from "../Interfaces/Route";

const Routes: Route[] = [
{
    method: "get",
    route: "/users/polls",
    controller: PollController,
    action: "userPolls",
    error: "No such poll",
    auth: true,
},
{
    method: "get",
    route: "/polls/paginate/:offset/:limit",
    controller: PollController,
    action: "paginate",
    error: "Couldn't fetch polls"
},
{
    method: "get",
    route: "/polls/:uuid",
    controller: PollController,
    action: "one",
    error: "No such poll",
},
{
    method: "post",
    route: "/users/polls",
    controller: PollController,
    action: "save",
    error: "Couldn't save poll",
    auth: true
},
{
    method: "delete",
    route: "/polls/:uuid",
    controller: PollController,
    action: "remove",
    error: "Couldn't delete poll"
},
{
    method: "post",
    route: "/polls/:uuid",
    controller: PollController,
    action: "update",
    error: "Couldn't update poll"
}
];

module.exports = Routes;