import React from "react";
import { Route } from "react-router-dom";
import { FrontPage } from "../frontpage/FrontPage.jsx";
import { Login } from "../auth/Login.jsx";
import { SignUp } from "../auth/SignUp.jsx";
import { ViewPoll } from "../viewPoll/ViewPoll.jsx";
import { CreatePoll } from "../createPoll/CreatePoll.jsx";


export const MainRouter = () => {
    return (
        <div>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/poll/:uuid" component={ViewPoll} />
            <Route exact path="/createpoll" component={CreatePoll} />
        </div>
    );
};
