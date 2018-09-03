import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import menu from "../reducers/menu";
import search from "../reducers/search";
import loading from "../reducers/loading";

const store = createStore(
    combineReducers({ menu, search, loading }),
    applyMiddleware(thunk)
);

export default store;
