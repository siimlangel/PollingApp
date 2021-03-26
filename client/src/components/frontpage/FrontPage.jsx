import React from "react";
import {useSelector} from "react-redux";

import { ConditionalLink } from "../header/ConditionalLink";
import { PollBrowser } from "../pollBrowser/PollBrowser";



import "./frontpage.css";

export const FrontPage = () => {

    const isAuthenticated = useSelector(state => state.token !== null);


    return <div>
        {isAuthenticated && (
            <div className="createpoll-link-container">
                <ConditionalLink className="createpoll-link frontpage-link" text="Create a poll!" to="/createpoll" condition={isAuthenticated}/>
            </div>
            
        )}

        <PollBrowser />
        
    </div>;
};
