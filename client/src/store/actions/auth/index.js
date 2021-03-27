import * as types from "../../types/auth";
import axios from "axios";

export const authStart = () => {
    return {
        type: types.AUTH_START,
    };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    return {
        type: types.AUTH_LOGOUT,
    };
};

export const authSuccess = (token) => {
    return {
        type: types.AUTH_SUCCESS,
        token,
    };
};

export const authFail = (error) => {
    return {
        type: types.AUTH_FAIL,
        error,
    };
};

export const setUser = (user) => {
    return {
        type: types.SET_USER,
        user,
    };
};

export const authLogin = (username, password) => (dispatch) => {
    dispatch(authStart());

    // Send credentials
    return axios
        .post("/users/login", {
            username,
            password,
        })
        .then((res) => {
            // If credentials valid set jwt in localstorage
            const token = res.data.Token;
            localStorage.setItem("token", token);

            dispatch(authSuccess(token));
            return Promise.resolve("Login Success");
        })
        .catch((err) => {
            const errorMessage = err.response.data.error;
            dispatch(authFail(errorMessage));
            return Promise.reject(errorMessage);
        });
};

export const authSignup = (username, password) => (dispatch) => {
    dispatch(authStart());

    // Send credentials
    return axios
        .post("/users/register", {
            username,
            password,
        })
        .then((res) => {
            const token = res.data.Token;
            localStorage.setItem("token", token);

            dispatch(authSuccess(token));

            return Promise.resolve("Sign Up Success");
        })
        .catch((err) => {
            const errorMessage = err.response.data.error;
            dispatch(authFail(errorMessage));
            return Promise.reject(errorMessage);
        });
};

export const tryAutoLogin = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token === undefined || token === null) {
        // If no token in localstorage log the user out
        dispatch(authLogout());
    } else {
        // LOg the user in with the token saved in localstorage
        dispatch(authSuccess(token));
        return axios
            .get(`/users/${token.split(" ")[1]}`, {
                headers: { Authorization: token },
            })
            .then((res) => {
                dispatch(setUser(res.data));
            })
            .catch((err) => {
                dispatch(authLogout());
            });
    }
};
