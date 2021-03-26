import * as types from "../../types/auth";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        user: null,
    };
};

const setUser = (state, action) => {
    return {
        ...state,
        user: action.user,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_START:
            return authStart(state, action);
        case types.AUTH_SUCCESS:
            return authSuccess(state, action);
        case types.AUTH_FAIL:
            return authFail(state, action);
        case types.AUTH_LOGOUT:
            return authLogout(state, action);
        case types.SET_USER:
            return setUser(state, action);
        default:
            return state;
    }
};

export default reducer;
