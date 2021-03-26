import React, { useState, useRef } from "react";
import useForm from "../../utils/UseForm";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/auth";

import "./auth.css";
import { Loader } from "../loader/Loader";

export const SignUp = (props) => {
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

        if (user.password.length < 8) {
            console.log(user.password.length);
            setError("Password has to be longer than 8 characters");
            return;
        }

        dispatch(actions.authSignup(user.username, user.password))
            .then((res) => {
                dispatch(actions.tryAutoLogin())
                .then(() => {
                    props.history.push("/");
                });
            })
            .catch((err) => {
                setError("Username already taken");
            });
    };

    const handleFocus = ref => {
        ref.current.style.color = "rgb(0, 160, 223)";
        ref.current.style.fontWeight = "bold";
    }

    const handleBlur = ref => {
        ref.current.style.color = "black";
        ref.current.style.fontWeight = 400;
    }

    return (
        <div>
            <div className="title-container">
                <h1>Sign Up</h1>
            </div>
            <form ref={usernameRef} onSubmit={onSubmit}>
                <label htmlFor="username">Username: </label>
                <input className="input-signup"
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    required
                    onFocus={() => handleFocus(usernameRef)}
                    onBlur={() => handleBlur(usernameRef)}
                />
                <label ref={passwordRef} htmlFor="password">Password: </label>
                <input className="input-signup"
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    required
                    onFocus={() => handleFocus(passwordRef)}
                    onBlur={() => handleBlur(passwordRef)}
                />
                <button className="btn-signup" type="submit"> Sign Up! </button>
            </form>
            {loading && <Loader />}
            {error && <div className="error">{error}</div>}
        </div>
    );
};
