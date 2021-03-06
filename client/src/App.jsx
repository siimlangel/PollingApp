import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./components/router/MainRouter";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as actions from "./store/actions/auth";

import { Header } from "./components/header/Header";

export const App = () => {
    const dispatch = useDispatch();

    // Try to log an user in automaticallt in case of page refresh or whatnot
    useEffect(() => {
        dispatch(actions.tryAutoLogin());
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Header />
                <MainRouter />
            </BrowserRouter>
        </div>
    );
};

export default App;
