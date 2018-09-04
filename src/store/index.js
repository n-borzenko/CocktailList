import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import search from "../reducers/search";
import loading from "../reducers/loading";

export const history = createBrowserHistory();
const rootReducer = combineReducers({ search, loading });

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(routerMiddleware(history), thunk)
);

export default store;
