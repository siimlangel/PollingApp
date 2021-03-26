
import React from 'react'
import { ConditionalLink } from './ConditionalLink';
import {useSelector, useDispatch} from "react-redux";
import * as actions from "../../store/actions/auth";

import "./header.css";

export const Header = () => {

    const isAuthenticated = useSelector(state => state.token !== null);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(actions.authLogout());
    }

    return (
        <header className="header-container">
            <div className="header-title-container">
                <h1><a href="/">Polling</a></h1>
            </div>
            <div className="header-profile-container">
                {(isAuthenticated && user) && (
                    <div className="header-username-container">
                        <p>Welcome {user.username}</p>
                    </div>
                )}
            </div>
            <div className="header-link-container">
                <ConditionalLink text="Main" to="/" condition={true}/>
                <ConditionalLink text="Login" to="/login" condition={!isAuthenticated}/>
                <ConditionalLink text="Sign up" to="/signup" condition={!isAuthenticated}/>
                <ConditionalLink text="Log out" to="/" condition={isAuthenticated} onClick={logOut} renderPathConditionally={false} />
            </div>
           
        </header>
    )
}
