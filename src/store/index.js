import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import menu from "../reducers/menu";
import search from "../reducers/search";

export default createStore(
    combineReducers({ menu, search }),
    applyMiddleware(thunk)
);
