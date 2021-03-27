import React, { useState, useRef } from "react";
import useForm from "../../utils/UseForm";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/auth";

import "./auth.css";
import { Loader } from "../loader/Loader";

export const Login = (props) => {
    const loading = useSelector((state) => state.loading);
    const [error, setError] = useState(null);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);


    const dispatch = useDispatch();

    const [user, handleChange] = useForm({
        username: "",
        password: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        setError(null);

        // Try to log the user in
        dispatch(actions.authLogin(user.username, user.password))
            .then((res) => {
                dispatch(actions.tryAutoLogin())
                .then(() => props.history.push("/"));
            })
            .catch((err) => {
                setError("Invalid credentials");
            });
    };

    // To change label color on input focus
    const handleFocus = ref => {
        ref.current.style.fontWeight = "bold";
        ref.current.style.color = "green";
    }

    const handleBlur = ref => {
        ref.current.style.fontWeight = 400;
        ref.current.style.color = "black";
    }


    return (
        <div>
            <div className="title-container">
                <h1>Login</h1>
            </div>
            <form onSubmit={onSubmit}>
                <label ref={usernameRef} htmlFor="username">Username: </label>
                <input className="input-login"
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    required
                    onFocus={() => handleFocus(usernameRef)}
                    onBlur={() => handleBlur(usernameRef)}
                />
                <label ref={passwordRef} htmlFor="password">Password: </label>
                <input className="input-login"
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    required
                    onFocus={() => handleFocus(passwordRef)}
                    onBlur={() => handleBlur(passwordRef)}
                />
                <button type="submit" className="btn-login"> Login! </button>
            </form>
            {loading && <Loader color={"rgb(35, 167, 8)"}/>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};
