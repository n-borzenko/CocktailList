import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import menu from "../reducers/menu";
import search from "../reducers/search";
import loading from "../reducers/loading";

export const history = createBrowserHistory();
const rootReducer = combineReducers({ menu, search, loading });

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(thunk)
);

export default store;
