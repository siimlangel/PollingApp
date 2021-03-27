import authReducer from "./reducers/auth";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// for chrome dev extension
const composeExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    authReducer,
    composeExtension(applyMiddleware(thunk))
);

export default store;
